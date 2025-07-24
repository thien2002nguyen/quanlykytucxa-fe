import { geistSans, geistMono } from "./fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReduxProvider } from "@/store/provider";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { appConfig } from "@/config/appConfig";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: appConfig.site_name,
    template: `%s | ${appConfig.site_name}`,
  },
  description: appConfig.description,
  keywords: appConfig.keywords,
  robots: {
    follow: true,
    index: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/logo.ico",
  },
  authors: [
    {
      url: appConfig.url,
      name: appConfig.title,
    },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID,
  },
  metadataBase: new URL(appConfig.url),
  openGraph: {
    images: `${appConfig.url}/manifest/icon-512x512.jpg`,
    type: "article",
    title: appConfig.title,
    authors: appConfig.title,
    description: appConfig.description,
    locale: appConfig.locale,
    siteName: appConfig.site_name,
  },
};

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
