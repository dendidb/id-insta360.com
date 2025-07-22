"use client";

import { useState } from "react";
import { 
  Typography, 
  Card, 
  List, 
  Button, 
  Tag, 
  Space, 
  Avatar, 
  Input,
  Divider,
  Tabs
} from "antd";
import { 
  MessageOutlined, 
  FireOutlined, 
  ClockCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Mock forum categories
const categories = [
  {
    id: 1,
    name: "Product Discussion",
    description: "Discuss Insta360 products, features, and usage tips",
    postsCount: 156,
    icon: "📷",
  },
  {
    id: 2,
    name: "Troubleshooting",
    description: "Get help with technical issues and troubleshooting",
    postsCount: 89,
    icon: "🔧",
  },
  {
    id: 3,
    name: "Photo & Video Gallery",
    description: "Share your best shots and get feedback",
    postsCount: 243,
    icon: "🎬",
  },
  {
    id: 4,
    name: "Tips & Tutorials",
    description: "Share and discover tips, tricks, and tutorials",
    postsCount: 67,
    icon: "📝",
  },
];

// Mock recent posts
const recentPosts = [
  {
    id: 1,
    title: "Best settings for low light with the X3?",
    author: {
      name: "CameraEnthusiast",
      avatar: null,
    },
    category: "Product Discussion",
    replies: 12,
    views: 345,
    lastActivity: "2 hours ago",
    isHot: true,
  },
  {
    id: 2,
    title: "My X3 won't turn on after firmware update",
    author: {
      name: "TechGuru",
      avatar: null,
    },
    category: "Troubleshooting",
    replies: 8,
    views: 129,
    lastActivity: "5 hours ago",
    isHot: false,
  },
  {
    id: 3,
    title: "Amazing sunset timelapse I captured with my ONE RS",
    author: {
      name: "SunsetChaser",
      avatar: null,
    },
    category: "Photo & Video Gallery",
    replies: 24,
    views: 567,
    lastActivity: "1 day ago",
    isHot: true,
  },
  {
    id: 4,
    title: "Tutorial: Advanced stitching techniques for cleaner 360 images",
    author: {
      name: "EditingPro",
      avatar: null,
    },
    category: "Tips & Tutorials",
    replies: 17,
    views: 412,
    lastActivity: "2 days ago",
    isHot: false,
  },
  {
    id: 5,
    title: "ONE RS battery life discussion",
    author: {
      name: "PowerUser",
      avatar: null,
    },
    category: "Product Discussion",
    replies: 32,
    views: 723,
    lastActivity: "3 days ago",
    isHot: true,
  },
];

export default function ForumHomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Forum Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6 bg-[#FF5A00] text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Title level={2} className="text-white mb-2">Welcome to the Insta360 Community</Title>
              <Paragraph className="text-white opacity-90 mb-4">
                Join discussions about Insta360 products, share your creations, and connect with other users.
              </Paragraph>
            </div>
            <Button 
              type="primary" 
              size="large" 
              className="bg-white text-[#FF5A00] border-white hover:bg-gray-100"
              href="/forum/discussions/new"
            >
              Start a Discussion
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Search */}
      <Card className="mb-6">
        <Input
          size="large"
          placeholder="Search the forum..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card title="Categories" className="mb-6">
          <List
            itemLayout="horizontal"
            dataSource={categories}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <div key="posts">
                    <Text type="secondary">{item.postsCount} posts</Text>
                  </div>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                      {item.icon}
                    </div>
                  }
                  title={<Link href={`/forum/categories/${item.id}`}>{item.name}</Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </motion.div>

      {/* Latest Discussions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mb-6">
          <Tabs defaultActiveKey="recent">
            <TabPane 
              tab={
                <span>
                  <ClockCircleOutlined />
                  Recent
                </span>
              } 
              key="recent"
            >
              <List
                itemLayout="horizontal"
                dataSource={recentPosts}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Space key="stats">
                        <Text type="secondary"><MessageOutlined /> {item.replies}</Text>
                        <Text type="secondary">{item.views} views</Text>
                      </Space>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar size="large" src={item.author.avatar}>
                          {item.author.name[0]}
                        </Avatar>
                      }
                      title={
                        <Space>
                          <Link href={`/forum/discussions/${item.id}`}>{item.title}</Link>
                          {item.isHot && <Tag color="red" icon={<FireOutlined />}>HOT</Tag>}
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={1}>
                          <Space>
                            <Text type="secondary">By {item.author.name}</Text>
                            <Text type="secondary">in</Text>
                            <Link href={`/forum/categories/${item.category}`}>{item.category}</Link>
                          </Space>
                          <Text type="secondary">
                            Last activity: {item.lastActivity}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane 
              tab={
                <span>
                  <FireOutlined />
                  Popular
                </span>
              } 
              key="popular"
            >
              <List
                itemLayout="horizontal"
                dataSource={recentPosts.filter(post => post.isHot)}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Space key="stats">
                        <Text type="secondary"><MessageOutlined /> {item.replies}</Text>
                        <Text type="secondary">{item.views} views</Text>
                      </Space>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar size="large" src={item.author.avatar}>
                          {item.author.name[0]}
                        </Avatar>
                      }
                      title={
                        <Space>
                          <Link href={`/forum/discussions/${item.id}`}>{item.title}</Link>
                          <Tag color="red" icon={<FireOutlined />}>HOT</Tag>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={1}>
                          <Space>
                            <Text type="secondary">By {item.author.name}</Text>
                            <Text type="secondary">in</Text>
                            <Link href={`/forum/categories/${item.category}`}>{item.category}</Link>
                          </Space>
                          <Text type="secondary">
                            Last activity: {item.lastActivity}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <Title level={4}>Community Stats</Title>
          <Divider />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">1,256</div>
              <div className="text-gray-500">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3,789</div>
              <div className="text-gray-500">Total Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">27</div>
              <div className="text-gray-500">Active Today</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 