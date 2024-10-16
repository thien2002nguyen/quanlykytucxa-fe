import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";

// Các URL không được tự động làm mới token
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

// Interceptor cho yêu cầu
instanceAxios.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("persist:auth-quanlykytucxa") ?? "";

  // Biến lưu trữ thông tin người dùng
  let persist;
  let tokenInfo;

  if (userInfo) {
    // Nếu userInfo tồn tại, chuyển đổi sang object
    persist = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
    tokenInfo =
      typeof persist.token === "object"
        ? persist.token
        : JSON.parse(persist.token);
  } else {
    persist = {};
    tokenInfo = {};
  }

  // Nếu có accessToken, thêm vào headers
  if (tokenInfo.accessToken) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
    return modifiedConfig;
  }

  return config;
});

// Hàm xử lý khi token không hợp lệ
function handleTokenError() {
  const currentURL = new URL(window.location.href);
  // Xóa thông tin người dùng trong localStorage
  localStorage.setItem(
    "persist:auth-quanlykytucxa",
    JSON.stringify({
      token: "",
      user: "",
    })
  );
  // Điều hướng đến trang đăng nhập hoặc trang chính
  if (currentURL.pathname.includes("admin")) {
    window.location.href = `${currentURL.origin}/admin/dang-nhap`;
  } else {
    window.location.href = `${currentURL.origin}`;
  }
}

// Interceptor cho phản hồi
instanceAxios.interceptors.response.use(
  (response) => {
    // Nếu phản hồi hợp lệ, trả về dữ liệu
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    const persistString = localStorage.getItem("persist:auth-quanlykytucxa");
    const persist = persistString ? JSON.parse(persistString) : null;

    // Kiểm tra xem có tồn tại token trong localStorage không
    if (!persist || !persist.token) {
      handleTokenError();
      return Promise.reject(error);
    }

    const tokenInfo =
      typeof persist.token === "object"
        ? persist.token
        : JSON.parse(persist.token);

    // Khi API trả về lỗi 401 (Unauthorized)
    if (
      error.response?.status === 401 &&
      !routerNotRefreshed.includes(originalRequest.url as string)
    ) {
      // Kiểm tra sự tồn tại của refreshToken và accessToken
      if (!tokenInfo?.refreshToken || !tokenInfo?.accessToken) {
        handleTokenError();
      }

      // Giải mã refreshToken để kiểm tra thời gian hết hạn
      const decodedRefreshToken =
        tokenInfo?.refreshToken && jwtDecode(tokenInfo?.refreshToken || "");
      // Nếu refreshToken đã hết hạn, điều hướng đến trang đăng nhập
      if (decodedRefreshToken.exp! * 1000 < new Date().getTime()) {
        handleTokenError();
      }

      const headersWithRefreshToken = {
        refreshToken: `${tokenInfo.refreshToken}`,
      };

      // Thực hiện yêu cầu làm mới token
      if (!routerNotRefreshed.includes(originalRequest.url as string)) {
        return axios
          .post(`${baseURL}/admin/refresh-token`, null, {
            headers: headersWithRefreshToken,
          })
          .then((response) => {
            // Cập nhật token mới vào localStorage
            localStorage.setItem(
              "persist:auth-quanlykytucxa",
              JSON.stringify({
                token: response.data.data,
                user: persist.user,
              })
            );

            // Tiến hành thực hiện lại yêu cầu gốc với token mới
            return instanceAxios(originalRequest);
          })
          .catch((err) => {
            // Xử lý khi người dùng đã bị xóa tài khoản
            if (err?.response?.data?.messageCode === "USER_NOT_FOUND") {
              handleTokenError();
            } else {
              handleTokenError();
            }
            return Promise.reject(err);
          });
      }
    }
    return Promise.reject(error);
  }
);
