import type { Metadata } from "next";
import { geistSans, geistMono } from "./fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReduxProvider } from "@/store/provider";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </ReduxProvider>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
