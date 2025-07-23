"use client";

import { Layout, Menu, Button, Avatar } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeOutlined, 
  MessageOutlined, 
  UserOutlined,
  BellOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Footer from "@/components/layout/Footer";

const { Header, Content } = Layout;

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const selectedKey = pathname.split('/')[2] || 'home';

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <Link href="/forum" className="text-[#FF5A00] font-bold text-xl mr-8">
            Insta360 Forum
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            className="border-0"
            items={[
              {
                key: "home",
                icon: <HomeOutlined />,
                label: <Link href="/forum">Home</Link>,
              },
              {
                key: "discussions",
                icon: <MessageOutlined />,
                label: <Link href="/forum/discussions">Discussions</Link>,
              },
              {
                key: "categories",
                icon: <MessageOutlined />,
                label: <Link href="/forum/categories">Categories</Link>,
              },
              {
                key: "members",
                icon: <UserOutlined />,
                label: <Link href="/forum/members">Members</Link>,
              },
            ]}
          />
        </div>
        <div className="flex items-center">
          <Button 
            type="text" 
            icon={<SearchOutlined />}
            className="mr-2"
          />
          {session ? (
            <>
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                className="mr-2"
              />
              <Avatar 
                icon={<UserOutlined />} 
                src={session.user.image} 
                className="cursor-pointer"
              />
            </>
          ) : (
            <>
              <Button type="link" href="/login">
                Login
              </Button>
              <Button type="primary" href="/register" className="ml-2">
                Register
              </Button>
            </>
          )}
        </div>
      </Header>
      <Content className="px-4 py-6 md:px-8 md:py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}