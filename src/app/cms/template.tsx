"use client";

import { ConfigProvider } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { insta360Theme } from "@/theme/themeConfig";

export default function CmsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={insta360Theme}>
        <div className="cms-layout">
          {children}
        </div>
      </ConfigProvider>
    </AntdRegistry>
  );
} 