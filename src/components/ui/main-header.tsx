"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer, Layout, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const { Header } = Layout;

const navItems = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "dealers", label: "Dealers", href: "/dealers" },
  { key: "forum", label: "Forum", href: process.env.NEXT_PUBLIC_FORUM_URL },
];

export function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const selectedKey = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )?.key;

  return (
    <Header className="bg-white shadow-sm z-10 px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-8">
          <span className="font-bold text-xl text-[#FF5A00]">Insta360</span>
        </Link>
        
        <div className="hidden md:flex">
          <Menu
            mode="horizontal"
            selectedKeys={selectedKey ? [selectedKey] : []}
            className="border-none"
            items={navItems.map((item) => ({
              key: item.key,
              label: (
                <Link href={item.href || '#'}>
                  {item.label}
                </Link>
              ),
            }))}
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button
          type="link"
          href="/login"
          className="hidden md:block"
        >
          Login
        </Button>
        
        <Button
          type="primary"
          className="ml-2 hidden md:block"
          href="/register"
        >
          Register
        </Button>
        
        <Button
          icon={<MenuOutlined />}
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        />
      </div>
      
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={[
            ...navItems.map((item) => ({
              key: item.key,
              label: (
                <Link href={item.href || '#'} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ),
            })),
            {
              key: "login",
              label: (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              ),
            },
            {
              key: "register",
              label: (
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              ),
            },
          ]}
        />
      </Drawer>
    </Header>
  );
} 