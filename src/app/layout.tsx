import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Auth } from "@/components/auth/auth-provider";
import { insta360Theme } from "@/theme/themeConfig";
import { ColorProvider } from "@/contexts/ColorContext";
import "./globals.css";
// Import the patch for React 19 compatibility
import "@/lib/antd-patch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Insta360 Indonesia",
  description: "Official Insta360 Indonesia Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider theme={insta360Theme}>
            <Auth>
              <ColorProvider>{children}</ColorProvider>
            </Auth>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
