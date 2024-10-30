import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import dayjs from "dayjs";

// Các URL không cần làm mới token tự động
const routerNotRefreshed = ["/admin/dang-nhap"];

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
  const storageKey = "auth-quanlykytucxa"; // Luôn là admin

  // Xóa token và thông tin người dùng khỏi localStorage
  localStorage.setItem(
    `persist:${storageKey}`,
    JSON.stringify({
      token: "", // Xóa token
      admin: "", // Xóa admin
    })
  );

  // Điều hướng đến trang đăng nhập
  const loginPath = "/admin/dang-nhap";
  window.location.href = `${currentURL.origin}${loginPath}`;
}

// Interceptor xử lý trước khi gửi yêu cầu
instanceAxios.interceptors.request.use((config) => {
  const currentURL = new URL(window.location.href);

  // Kiểm tra xem có phải là admin không
  if (currentURL.pathname.includes("admin")) {
    const storageKey = "persist:auth-quanlykytucxa"; // Chỉ sử dụng cho admin

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
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const currentURL = new URL(window.location.href);

    // Kiểm tra xem có phải là admin không
    if (currentURL.pathname.includes("admin")) {
      const storageKey = "persist:auth-quanlykytucxa"; // Luôn là admin

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

      // Khi gặp lỗi 401 (Unauthorized), kiểm tra token và refresh token nếu cần
      if (
        error.response?.status === 401 &&
        !routerNotRefreshed.includes(originalRequest.url as string)
      ) {
        // Nếu không có refreshToken hoặc accessToken, điều hướng đến đăng nhập
        if (!tokenInfo?.refreshToken || !tokenInfo?.accessToken) {
          handleTokenError();
        }

        // Nếu refreshToken đã hết hạn, điều hướng đến đăng nhập
        if (dayjs(tokenInfo?.refreshExpiresIn).isBefore(dayjs())) {
          handleTokenError();
        }

        const refreshTokenData = {
          refreshToken: `${tokenInfo.refreshToken}`,
        };

        // Thực hiện yêu cầu làm mới token
        if (!routerNotRefreshed.includes(originalRequest.url as string)) {
          const refreshTokenURL = `${baseURL}/admin/refresh-token`;

          return axios
            .post(refreshTokenURL, refreshTokenData, {
              // Gửi refreshToken trong body
              headers: {
                "Content-Type": "application/json", // Đảm bảo loại nội dung được chỉ định
              },
            })
            .then((response) => {
              // Cập nhật token mới vào localStorage
              localStorage.setItem(
                storageKey,
                JSON.stringify({
                  token: {
                    ...tokenInfo,
                    accessToken: response.data.accessToken,
                  },
                  admin: persist.admin,
                })
              );

              // Thực hiện lại yêu cầu gốc với token mới
              return instanceAxios(originalRequest);
            })
            .catch((err) => {
              // Nếu refreshToken không hợp lệ hoặc người dùng đã bị xóa tài khoản
              handleTokenError();
              return Promise.reject(err);
            });
        }
      }
    }
    return Promise.reject(error);
  }
);
