"use client";

import { useEffect, useState } from "react";
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Tag,
  Button
} from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  CommentOutlined,
  ShopOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Title } = Typography;

// Mock data for dashboard
const recentProducts = [
  {
    id: "1",
    name: "Insta360 X3",
    price: 449.99,
    status: "Active",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Insta360 ONE RS",
    price: 299.99,
    status: "Active",
    createdAt: "2023-05-20",
  },
  {
    id: "3",
    name: "Insta360 Flow",
    price: 159.99,
    status: "Active",
    createdAt: "2023-04-10",
  },
];

export default function CmsDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const productColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "success" : "default"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            href={`/cms/products/${record.id}`}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="mb-0">Dashboard</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          href="/cms/products/new"
        >
          Add Product
        </Button>
      </div>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Total Products"
              value={24}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Total Users"
              value={156}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Forum Posts"
              value={42}
              prefix={<CommentOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Dealers"
              value={18}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Recent Products */}
      <Card 
        title="Recent Products" 
        extra={<Link href="/cms/products">View All</Link>}
        className="mb-8"
        loading={loading}
      >
        <Table
          dataSource={recentProducts}
          columns={productColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
      
      {/* Quick Links */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card
            title="Manage Products"
            extra={<Link href="/cms/products">Go</Link>}
            loading={loading}
          >
            Add, edit, or remove products from your catalog.
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            title="Manage Users"
            extra={<Link href="/cms/users">Go</Link>}
            loading={loading}
          >
            View and manage user accounts and permissions.
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            title="Manage Media"
            extra={<Link href="/cms/media">Go</Link>}
            loading={loading}
          >
            Upload and manage media files for your products.
          </Card>
        </Col>
      </Row>
    </div>
  );
} 