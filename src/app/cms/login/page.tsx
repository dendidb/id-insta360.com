"use client";

import { useState } from "react";
import { Card, Form, Input, Button, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function CmsLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError("");
    try {
      // Use NextAuth signIn for real authentication
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (result?.ok) {
        router.push("/cms/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={2} className="text-primary mb-0">Insta360 CMS</Title>
          <p className="text-gray-500">Login to access the admin panel</p>
        </div>
        
        {error && (
          <Alert
            message="Login Failed"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="Email" 
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full" 
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
} 