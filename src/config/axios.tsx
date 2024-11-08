import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import dayjs from "dayjs";

// Các URL không cần làm mới token tự động
const routerNotRefreshed = ["/admin/dang-nhap", "/"];

// Thiết lập baseURL từ biến môi trường
export const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Tạo một instance Axios với baseURL và headers mặc định
export const instanceAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm xử lý khi token không hợp lệ hoặc tài khoản bị xóa
function handleTokenError(role: "admin" | "students") {
  const currentURL = new URL(window.location.href);
  const storageKey =
    role === "admin" ? "auth-quanlykytucxa" : "auth-sinhvienkytucxa";

  // Xóa token và thông tin người dùng khỏi localStorage
  localStorage.setItem(
    `persist:${storageKey}`,
    JSON.stringify({
      token: "",
      [role]: "", // Xóa thông tin người dùng (admin hoặc student)
    })
  );

  // Điều hướng đến trang đăng nhập tương ứng
  const loginPath = role === "admin" ? "/admin/dang-nhap" : "/";
  window.location.href = `${currentURL.origin}${loginPath}`;
}

// Interceptor xử lý trước khi gửi yêu cầu
instanceAxios.interceptors.request.use((config) => {
  const currentURL = new URL(window.location.href);

  // Kiểm tra xem là admin hay student
  const isAdmin = currentURL.pathname.includes("admin");
  const storageKey = isAdmin
    ? "persist:auth-quanlykytucxa"
    : "persist:auth-sinhvienkytucxa";

  const userInfo = localStorage.getItem(storageKey) ?? "";
  let persist;
  let tokenInfo;

  if (userInfo) {
    persist = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
    tokenInfo =
      typeof persist.token === "object"
        ? persist.token
        : JSON.parse(persist.token);
  } else {
    persist = {};
    tokenInfo = {};
  }

  // Nếu có accessToken, thêm nó vào headers
  if (tokenInfo.accessToken) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
    return modifiedConfig;
  }

  return config;
});

// Interceptor xử lý phản hồi từ server
instanceAxios.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu nếu phản hồi hợp lệ
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const currentURL = new URL(window.location.href);

    // Kiểm tra xem là admin hay student
    const isAdmin = currentURL.pathname.includes("admin");
    const role = isAdmin ? "admin" : "students";
    const storageKey = isAdmin
      ? "persist:auth-quanlykytucxa"
      : "persist:auth-sinhvienkytucxa";

    const persistString = localStorage.getItem(storageKey);
    const persist = persistString ? JSON.parse(persistString) : null;

    // Nếu không có token trong localStorage, điều hướng đến trang đăng nhập
    if (!persist || !persist.token) {
      handleTokenError(role);
      return Promise.reject(error);
    }

    const tokenInfo =
      typeof persist.token === "object"
        ? persist.token
        : JSON.parse(persist.token);

    // Khi gặp lỗi 401 (Unauthorized), kiểm tra token và refresh token nếu cần
    if (
      error.response?.status === 401 &&
      !routerNotRefreshed.includes(originalRequest.url as string)
    ) {
      // Nếu không có refreshToken hoặc accessToken, điều hướng đến đăng nhập
      if (!tokenInfo?.refreshToken || !tokenInfo?.accessToken) {
        handleTokenError(role);
      }

      // Nếu refreshToken đã hết hạn, điều hướng đến đăng nhập
      if (dayjs(tokenInfo?.refreshExpiresIn).isBefore(dayjs())) {
        handleTokenError(role);
      }

      const refreshTokenData = {
        refreshToken: `${tokenInfo.refreshToken}`,
      };

      // Thực hiện yêu cầu làm mới token
      const refreshTokenURL = `${baseURL}/${role}/refresh-token`;

      try {
        const response = await axios.post(refreshTokenURL, refreshTokenData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Cập nhật token mới vào localStorage
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            token: {
              ...tokenInfo,
              accessToken: response.data.accessToken,
            },
            [role]: persist[role], // giữ thông tin người dùng hiện tại
          })
        );
        return await instanceAxios(originalRequest);
      } catch (err) {
        // Nếu refreshToken không hợp lệ hoặc người dùng đã bị xóa tài khoản
        handleTokenError(role);
        return await Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
