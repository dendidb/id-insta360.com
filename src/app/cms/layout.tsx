"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Menu, Button, Drawer, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FileImageOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/cms/login';
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileDrawerVisible(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Get the first and second path segment for menu selection
  const pathSegments = pathname.split('/');
  const selectedKey = pathSegments[2] || 'dashboard';
  const selectedSubKey = pathSegments[3] || '';

  // Nested menu for products section
  const productSubMenu: MenuItem[] = [
    {
      key: 'products-management',
      label: <Link href="/cms/products/management">Management</Link>,
    },
    {
      key: 'products-accessories',
      label: <Link href="/cms/products/accessories">Accessories</Link>,
    },
    {
      key: 'products-interest',
      label: <Link href="/cms/products/interest">Interest</Link>,
    },
    {
      key: 'products-category',
      label: <Link href="/cms/products/category">Category</Link>,
    },
  ];

  // Menu items
  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/cms/dashboard">Dashboard</Link>,
    },
    {
      key: "post",
      icon: <CommentOutlined />,
      label: <Link href="/cms/post">Post</Link>,
    },
    {
      key: "products",
      icon: <ShoppingOutlined />,
      label: "Products",
      children: productSubMenu,
    },
    {
      key: "media",
      icon: <FileImageOutlined />,
      label: <Link href="/cms/media">Media</Link>,
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: <Link href="/cms/user">User</Link>,
    },
    {
      key: "role",
      icon: <SettingOutlined />,
      label: <Link href="/cms/role">Role</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={() => router.push('/cms/login')}>Logout</span>,
    },
  ];

  // Handle logout click
  const handleLogout = () => {
    // For mock version, just redirect to login page
    router.push('/cms/login');
    // In a real app, we would use NextAuth signOut
    // signOut({ redirect: false }).then(() => {
    //  router.push('/cms/login');
    // });
  };

  // Close drawer and navigate
  const handleMenuClick = () => {
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  if (isLoginPage) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Layout style={{ minHeight: "100vh", background: "white" }}>
        {/* Mobile Drawer */}
        <Drawer
          title="Insta360 CMS"
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          width={250}
          styles={{ body: { padding: 0, color: "white" } }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey, `products-${selectedSubKey}`]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Drawer>

        {/* Desktop Sider */}
        {!isMobile && (
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            theme="light"
            className="overflow-auto h-100vh fixed left-0 top-0 bottom-0"
            style={{ zIndex: 20, color: "white" }}
          >
            <div className="p-4 h-16 flex items-center justify-center">
              <Link href="/cms/dashboard" className="text-white font-bold">
                {collapsed ? "I360" : "Insta360 CMS"}
              </Link>
            </div>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectedKey, `products-${selectedSubKey}`]}
              items={menuItems}
            />
          </Sider>
        )}

        <Layout
          className={!isMobile ? (collapsed ? "ml-[0px]" : "ml-[0px]") : ""}
          style={{ transition: "all 0.500s", background: "transparent" }}
        >
          {/* Header */}
          <Header className="p-0 bg-white shadow-sm z-10 flex items-center justify-between" style={{ minHeight: 64, background: "white" }}>
            <div className="flex items-center">
              {isMobile ? (
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setMobileDrawerVisible(true)}
                  className="w-16 h-16 text-white"
                />
              ) : (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className="w-16 h-16 text-white"
                />
              )}
              {/* <Title level={4} className="mb-0 ml-2 text-white hidden sm:block">Insta360 CMS</Title> */}
            </div>
            <div className="pr-6 flex items-center">
              <span className="mr-4 hidden sm:inline text-white">Welcome, Admin</span>
              <Button
                type="text"
                icon={<LogoutOutlined className="text-white" />}
                onClick={handleLogout}
                className="text-white"
              >
                <span className="hidden sm:inline text-white">Logout</span>
              </Button>
            </div>
          </Header>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col items-center w-full py-8 px-2 sm:px-4 bg-gray-100">
            <div className="w-full bg-gray-50 rounded-lg shadow-sm p-6 sm:p-10">
              {children}
            </div>
          </main>

          {/* Footer */}
          <Footer className="text-center bg-transparent pb-6 pt-0">
            <div className="text-gray-500">
              Insta360 CMS &copy; {new Date().getFullYear()} - All rights reserved
            </div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
} 