import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// Các URL không cần làm mới token tự động
const routerNotRefreshed = ["admin/dang-nhap", "truy-cap"];

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
function handleTokenError() {
  const currentURL = new URL(window.location.href);
  const storageKey = "auth-kytucxadau"; // Chỉ kiểm tra với admin

  // Xóa token và thông tin người dùng khỏi localStorage
  localStorage.setItem(
    `persist:${storageKey}`,
    JSON.stringify({
      token: "",
      admin: "", // Xóa thông tin admin
    })
  );

  // Điều hướng đến trang đăng nhập của admin
  window.location.href = currentURL.pathname.includes("admin")
    ? `${currentURL.origin}/admin/dang-nhap`
    : `/truy-cap`;
}

// Interceptor xử lý trước khi gửi yêu cầu
instanceAxios.interceptors.request.use((config) => {
  // Chỉ kiểm tra token khi đường dẫn là admin
  const storageKey = "persist:auth-kytucxadau";
  const userInfo = localStorage.getItem(storageKey) ?? "";
  let tokenInfo;

  if (userInfo) {
    const persist = JSON.parse(userInfo);
    tokenInfo =
      typeof persist.token === "object"
        ? persist.token
        : JSON.parse(persist.token);
  }

  // Nếu có accessToken, thêm nó vào headers
  if (tokenInfo?.accessToken) {
    config.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
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

    // Chỉ làm mới token cho admin
    const storageKey = "persist:auth-kytucxadau";
    const persistString = localStorage.getItem(storageKey);
    const persist = persistString ? JSON.parse(persistString) : null;

    // Nếu không có token trong localStorage, điều hướng đến trang đăng nhập
    if (!persist || !persist.token) {
      handleTokenError();
      return Promise.reject(error);
    }

    const tokenInfo =
      typeof persist.token === "object"
        ? persist.token
        : JSON.parse(persist.token);

    // Khi gặp lỗi 401, kiểm tra và làm mới token nếu cần
    if (
      error.response?.status === 401 &&
      !routerNotRefreshed.includes(originalRequest.url as string)
    ) {
      // Nếu không có refreshToken hoặc accessToken, điều hướng đến đăng nhập
      if (!tokenInfo?.refreshToken || !tokenInfo?.accessToken) {
        handleTokenError();
      }

      // Nếu refreshToken đã hết hạn, điều hướng đến đăng nhập
      if (tokenInfo?.refreshExpiresIn < Date.now()) {
        handleTokenError();
      }

      const refreshTokenData = {
        refreshToken: `${tokenInfo.refreshToken}`,
      };

      // Thực hiện yêu cầu làm mới token
      const refreshTokenURL = `${baseURL}/users/refresh-token`;

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
            user: persist.user, // Giữ thông tin user
          })
        );
        return await instanceAxios(originalRequest);
      } catch (err) {
        // Nếu refreshToken không hợp lệ hoặc người dùng đã bị xóa tài khoản
        handleTokenError();
        return await Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
