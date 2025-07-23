"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Drawer, Input, Menu } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  SearchOutlined,
  CloseOutlined,
  GlobalOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import "@/styles/custom-nav.css";
import { useColorContext } from "@/contexts/ColorContext";
import { motion, AnimatePresence } from "framer-motion";
import SecondaryHeader from "./SecondaryHeader";

const { Search } = Input;

interface MenuItem {
  key: string;
  label: React.ReactNode;
  children?: MenuItem[];
}

type ProductCategory = {
  id: string;
  name: string;
  path: string;
};

type Product = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  categories: string[];
};

interface HeaderProps {
  id?: string;
  productTitle?: string;
  productSections?: {
    id: string;
    label: string;
  }[];
  productCtaButton?: {
    label: string;
    url: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  id,
  productTitle,
  productSections = [],
  productCtaButton,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("popular");
  const [hoverMenuItem, setHoverMenuItem] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { isDarkImage } = useColorContext();

  const isIntendedPage = pathname !== "/" && pathname.startsWith("/explore");
  const [isHovering, setIsHovering] = useState(false);
  const isProductPage = pathname.startsWith("/products");

  const mainMenuItems: MenuItem[] = [
    {
      key: "home",
      label: (
        <Link
          href="/"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          HOME
        </Link>
      ),
    },
    {
      key: "products",
      label: (
        <Link
          href="/products"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          PRODUK
        </Link>
      ),
      children: [
        {
          key: "360-cameras",
          label: <Link href="/products/category/action-360">Kamera 360</Link>,
        },
        {
          key: "action-cameras",
          label: (
            <Link href="/products/category/action-biasa">
              Kamera Aksi Biasa
            </Link>
          ),
        },
        {
          key: "gimbal-stabilizers",
          label: (
            <Link href="/products/category/gimbal-stabilizer">
              Gimbal Stabilizer
            </Link>
          ),
        },
        {
          key: "home-office",
          label: (
            <Link href="/products/category/rumah-kantor">Rumah & Kantor</Link>
          ),
        },
        {
          key: "professional",
          label: (
            <Link href="/products/category/professional">Professional</Link>
          ),
        },
      ],
    },
    {
      key: "insta360-plus",
      label: (
        <Link
          href="/insta360-plus"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          INSTA360+
        </Link>
      ),
    },
    {
      key: "enterprise",
      label: (
        <Link
          href="/enterprise"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          PERUSAHAAN
        </Link>
      ),
    },
    {
      key: "downloads",
      label: (
        <Link
          href="/downloads"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          UNDUHAN
        </Link>
      ),
    },
    {
      key: "support",
      label: (
        <Link
          href="/support"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          DUKUNGAN
        </Link>
      ),
    },
    {
      key: "discover",
      label: (
        <Link
          href="/discover"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          MENJELAJAHI
        </Link>
      ),
    },
    {
      key: "kontak-kami",
      label: (
        <Link
          href="/contact"
          className={`${
            scrolled ? "text-black" : isDarkImage ? "text-white" : "text-black"
          } font-medium`}
        >
          KONTAK KAMI
        </Link>
      ),
    },
  ];

  const productCategories: ProductCategory[] = [
    { id: "popular", name: "Terpopuler", path: "/products/popular" },
    { id: "360", name: "Kamera 360", path: "/products/category/360-cameras" },
    {
      id: "wide-angle",
      name: "Kamera Ultra-Wide",
      path: "/products/category/wide-angle-cameras",
    },
    {
      id: "gimbal",
      name: "Gimbal Genggam",
      path: "/products/category/handheld-gimbals",
    },
    {
      id: "vr",
      name: "Rapat Virtual",
      path: "/products/category/video-conferencing",
    },
    {
      id: "pro",
      name: "Kamera VR Profesional",
      path: "/products/category/professional-vr",
    },
    {
      id: "accessories",
      name: "Aksesori",
      path: "/products/category/accessories",
    },
  ];

  const products: Product[] = [
    {
      id: "x5",
      name: "Insta360 X5",
      tagline: "Flagship 360° action camera with 8K quality.",
      image: "/images/x5.png",
      categories: ["popular", "360"],
    },
    {
      id: "x3",
      name: "Insta360 X3",
      tagline: "The 360° powerhouse.",
      image: "/images/x3.png",
      categories: ["popular", "360"],
    },
    {
      id: "ace-pro-2",
      name: "Insta360 Ace Pro 2",
      tagline: "8K AI-Powered Action Cam",
      image: "/images/ace-2-pro.png",
      categories: ["popular", "wide-angle"],
    },
    {
      id: "go-3s",
      name: "Insta360 GO 3S",
      tagline: "Your tiny mighty 4K cam.",
      image: "/images/go-s.png",
      categories: ["popular", "wide-angle"],
    },
    {
      id: "flow-2-pro",
      name: "Insta360 Flow 2 Pro",
      tagline: "Your pocket AI filmmaker.",
      image: "/images/flow-2-pro.png",
      categories: ["popular", "gimbal"],
    },
    {
      id: "link-2",
      name: "Insta360 Link 2\nInsta360 Link 2C",
      tagline: "AI 4K webcam, pro audio.",
      image: "/images/link-2-2-c.png",
      categories: ["popular", "vr"],
    },
    {
      id: "titan-2",
      name: "Insta360 Titan 2",
      tagline: "Professional 11K VR camera.",
      image: "/images/titan-2.png",
      categories: ["pro"],
    },
    {
      id: "sphere",
      name: "Insta360 Sphere",
      tagline: "Make your drone invisible.",
      image: "/images/sphere.png",
      categories: ["pro"],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.categories.includes(activeCategoryId)
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setHeaderVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);

        if (isProductPage) {
          if (
            currentScrollY > 200 &&
            currentScrollY > lastScrollY.current &&
            headerVisible
          ) {
            setHeaderVisible(false);
          } else if (currentScrollY < lastScrollY.current && !headerVisible) {
            setHeaderVisible(true);
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProductPage, headerVisible]);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header
      id={id}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isProductPage
          ? isHovering
            ? "bg-black"
            : "bg-black"
          : scrolled || isIntendedPage
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
      style={{
        transform:
          isProductPage && !headerVisible
            ? "translateY(-50px)"
            : "translateY(0px)",
      }}
    >
      <div className="w-full px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex justify-between gap-20" style={{ gap: "5rem" }}>
            <Link href="/" className="flex items-center">
              <span className="sr-only">Insta360</span>
              <Image
                src={
                  isProductPage
                    ? isHovering
                      ? "/insta360-logo-white.svg"
                      : "/insta360-logo-white.svg"
                    : scrolled || isIntendedPage
                    ? "/insta360-logo.svg"
                    : isDarkImage
                    ? "/insta360-logo-white.svg"
                    : "/insta360-logo.svg"
                }
                alt="Insta360 Logo"
                width={100}
                height={24}
                className="object-contain"
              />
            </Link>

            <div className="hidden lg:flex">
              <ul className="custom-nav">
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("home")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    HOME
                    {hoverMenuItem === "home" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("products")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/products"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    PRODUK
                    {hoverMenuItem === "products" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                  <div className="custom-dropdown products-mega-menu">
                    <div className="mega-menu-content">
                      <div className="flex w-full">
                        <div
                          className={`w-1/5 ${
                            isProductPage && isHovering
                              ? "bg-black text-white"
                              : "bg-gray-50"
                          } py-4 border-r ${
                            isProductPage && isHovering
                              ? "border-gray-800"
                              : "border-gray-100"
                          }`}
                        >
                          <h3
                            className={`px-5 text-sm ${
                              isProductPage && isHovering
                                ? "text-gray-300"
                                : "text-gray-500"
                            } mb-3`}
                          >
                            Kategori Produk
                          </h3>
                          <ul className="category-list">
                            {productCategories.map((category) => (
                              <li
                                key={category.id}
                                className={`px-5 py-2 ${
                                  isProductPage && isHovering
                                    ? activeCategoryId === category.id
                                      ? "bg-gray-800 text-white"
                                      : "hover:bg-gray-800 text-gray-300"
                                    : activeCategoryId === category.id
                                    ? "active"
                                    : "hover:bg-gray-100"
                                } transition-all duration-300`}
                                onMouseEnter={() =>
                                  setActiveCategoryId(category.id)
                                }
                              >
                                <Link
                                  href={category.path}
                                  className={`text-sm font-medium flex justify-between items-center ${
                                    isProductPage && isHovering
                                      ? "text-gray-200"
                                      : ""
                                  }`}
                                >
                                  {category.name}
                                  {category.id !== "accessories" && (
                                    <RightOutlined
                                      style={{ fontSize: "10px" }}
                                    />
                                  )}
                                </Link>
                              </li>
                            ))}
                            <li
                              className={`px-5 py-2 ${
                                isProductPage && isHovering
                                  ? "hover:bg-gray-100 border-t border-gray-700"
                                  : "hover:bg-gray-100 border-t border-gray-200"
                              } mt-2 pt-3`}
                            >
                              <Link
                                href="/products/comparison"
                                className={`text-sm font-medium flex justify-between items-center ${
                                  isProductPage && isHovering
                                    ? "text-gray-200"
                                    : ""
                                }`}
                              >
                                Perbandingan{" "}
                                <span className="inline-block">
                                  <Image
                                    src={
                                      isProductPage && isHovering
                                        ? "/images/ic-comparison-dark.svg"
                                        : "/images/ic-comparison.svg"
                                    }
                                    width={16}
                                    height={16}
                                    alt="Compare"
                                  />
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div
                          className={`w-4/5 py-6 pl-6 pr-8 ${
                            isProductPage && isHovering
                              ? "bg-black"
                              : "bg-white"
                          }`}
                        >
                          <div className="grid grid-cols-3 gap-6 min-h-[150px]">
                            <AnimatePresence mode="wait">
                              {filteredProducts.slice(0, 6).map((product) => (
                                <motion.div
                                  key={product.id}
                                  className={`product-card flex flex-col ${
                                    isProductPage && isHovering
                                      ? "bg-gray"
                                      : "bg-gray-100"
                                  } p-4`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  layout
                                >
                                  <div className="flex mb-3 hover:scale-110 duration-500 transition-transform cursor-pointer">
                                    <div className="w-28 mr-4 relative overflow-hidden group-hover">
                                      <Image
                                        src={product.image}
                                        width={120}
                                        height={120}
                                        alt={product.name}
                                        className="object-contain"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4
                                        className={`font-medium mb-1 whitespace-pre-line ${
                                          isProductPage && isHovering
                                            ? "text-white"
                                            : ""
                                        }`}
                                      >
                                        {product.name}
                                      </h4>
                                      <p
                                        className={`text-xs ${
                                          isProductPage && isHovering
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                        } mb-1`}
                                      >
                                        {product.tagline}
                                      </p>
                                      <Link
                                        href={`/products/${product.id}`}
                                        className={`text-xs ${
                                          isProductPage && isHovering
                                            ? "text-gray-400 hover:text-white"
                                            : "text-gray-500 hover:underline"
                                        } mt-2 inline-block`}
                                      >
                                        Selengkapnya
                                      </Link>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>

                          <div className="text-center mt-6">
                            <Link
                              href={`/products/category/${activeCategoryId}`}
                              className={`inline-flex items-center ${
                                isProductPage && isHovering
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-600 hover:text-black"
                              } text-sm`}
                            >
                              Lihat Semua{" "}
                              <RightOutlined
                                style={{ fontSize: "10px", marginLeft: "4px" }}
                              />
                            </Link>
                          </div>
                        </div>

                        <div
                          className={`w-1/5 ${
                            isProductPage && isHovering
                              ? "bg-black"
                              : "bg-white"
                          } py-4`}
                        >
                          <h3
                            className={`px-5 text-sm ${
                              isProductPage && isHovering
                                ? "text-gray-300"
                                : "text-gray-500"
                            } mb-2 mt-1`}
                          >
                            Belanja Berdasarkan Minat
                          </h3>
                          <ul>
                            <li
                              className={`px-5 py-2 ${
                                isProductPage && isHovering
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Link
                                href="/interests/travel"
                                className={`text-sm font-medium flex items-center ${
                                  isProductPage && isHovering
                                    ? "text-gray-200"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={
                                    isProductPage
                                      ? "/images/icon-travel-dark.png"
                                      : "/images/icon-travel.png"
                                  }
                                  width={28}
                                  height={28}
                                  alt="Travel"
                                  className="mr-2"
                                />
                                Travel
                                <RightOutlined
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "0px",
                                    marginLeft: "auto",
                                  }}
                                />
                              </Link>
                            </li>
                            <li
                              className={`px-5 py-2 ${
                                isProductPage && isHovering
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Link
                                href="/interests/motorcycling"
                                className={`text-sm font-medium flex items-center ${
                                  isProductPage && isHovering
                                    ? "text-gray-200"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={
                                    isProductPage
                                      ? "/images/motorcycle-dark.png"
                                      : "/images/motorcycle.png"
                                  }
                                  width={28}
                                  height={28}
                                  alt="Motorcycling"
                                  className="mr-2"
                                />
                                Mengendarai Motor
                                <RightOutlined
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "0px",
                                    marginLeft: "auto",
                                  }}
                                />
                              </Link>
                            </li>
                            <li
                              className={`px-5 py-2 ${
                                isProductPage && isHovering
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Link
                                href="/interests/water-sports"
                                className={`text-sm font-medium flex items-center ${
                                  isProductPage && isHovering
                                    ? "text-gray-200"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={
                                    isProductPage
                                      ? "/images/water-sports-dark.png"
                                      : "/images/water-sports.png"
                                  }
                                  width={28}
                                  height={28}
                                  alt="Water Sports"
                                  className="mr-2"
                                />
                                Olahraga Air
                                <RightOutlined
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "0px",
                                    marginLeft: "auto",
                                  }}
                                />
                              </Link>
                            </li>
                            <li
                              className={`px-5 py-2 ${
                                isProductPage && isHovering
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Link
                                href="/interests/biking"
                                className={`text-sm font-medium flex items-center ${
                                  isProductPage && isHovering
                                    ? "text-gray-200"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={
                                    isProductPage
                                      ? "/images/biking-dark.png"
                                      : "/images/biking.png"
                                  }
                                  width={28}
                                  height={28}
                                  alt="Biking"
                                  className="mr-2"
                                />
                                Bersepeda
                                <RightOutlined
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "0px",
                                    marginLeft: "auto",
                                  }}
                                />
                              </Link>
                            </li>
                            <li
                              className={`px-5 py-2 ${
                                isProductPage && isHovering
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Link
                                href="/interests/winter-sports"
                                className={`text-sm font-medium flex items-center ${
                                  isProductPage && isHovering
                                    ? "text-gray-200"
                                    : ""
                                }`}
                              >
                                <Image
                                  src={
                                    isProductPage
                                      ? "/images/winter-sports-dark.png"
                                      : "/images/skate.png"
                                  }
                                  width={28}
                                  height={28}
                                  alt="Winter Sports"
                                  className="mr-2"
                                />
                                Olahraga Musim Dingin
                                <RightOutlined
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "0px",
                                    marginLeft: "auto",
                                  }}
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("insta360-plus")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/insta360-plus"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    INSTA360+
                    {hoverMenuItem === "insta360-plus" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("enterprise")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/enterprise"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    PERUSAHAAN
                    {hoverMenuItem === "enterprise" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("downloads")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/downloads"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    UNDUHAN
                    {hoverMenuItem === "downloads" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("support")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/support"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    DUKUNGAN
                    {hoverMenuItem === "support" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("discover")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/discover"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    MENJELAJAHI
                    {hoverMenuItem === "discover" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
                <li
                  className="custom-nav-item"
                  onMouseEnter={() => setHoverMenuItem("contact")}
                  onMouseLeave={() => setHoverMenuItem(null)}
                >
                  <Link
                    href="/contact"
                    className={`custom-nav-link ${
                      isProductPage
                        ? "text-white"
                        : scrolled || isIntendedPage
                        ? "text-black"
                        : "text-white"
                    } font-medium relative`}
                  >
                    KONTAK KAMI
                    {hoverMenuItem === "contact" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/store" className="inline-block">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black border-none rounded-full h-8 px-4 flex items-center gap-1 cursor-pointer">
                <Image
                  src="/images/store.svg"
                  alt="Store Icon"
                  width={16}
                  height={16}
                />
                <span className="font-medium text-sm">STORE</span>
              </button>
            </Link>
            <Button
              type="text"
              icon={
                <SearchOutlined
                  className={`${
                    isProductPage
                      ? "text-white"
                      : scrolled || isIntendedPage
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                />
              }
              onClick={toggleSearch}
              className={`h-8 w-8 flex items-center justify-center p-0 ${
                isProductPage
                  ? "hover:bg-gray-800/30"
                  : scrolled || isIntendedPage
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-800/30"
              }`}
            />
            <Button
              type="text"
              icon={
                <UserOutlined
                  className={`${
                    isProductPage
                      ? "text-white"
                      : scrolled || isIntendedPage
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                />
              }
              className={`h-8 w-8 flex items-center justify-center p-0 ${
                isProductPage
                  ? "hover:bg-gray-800/30"
                  : scrolled || isIntendedPage
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-800/30"
              }`}
            />
            <Button
              type="text"
              icon={
                <GlobalOutlined
                  className={`${
                    isProductPage
                      ? "text-white"
                      : scrolled || isIntendedPage
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                />
              }
              className={`h-8 w-8 flex items-center justify-center p-0 ${
                isProductPage
                  ? "hover:bg-gray-800/30"
                  : scrolled || isIntendedPage
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-800/30"
              }`}
            />
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <Link href="/store">
              <Button
                type="primary"
                className="bg-yellow-400 hover:bg-yellow-500 text-black border-none rounded-full h-8 px-4 flex items-center gap-1"
                style={{ borderRadius: "100px" }}
              >
                <Image
                  src="/images/store.svg"
                  alt="Store Icon"
                  width={16}
                  height={16}
                />
                <span className="font-medium text-sm">STORE</span>
              </Button>
            </Link>
            <Button
              type="text"
              icon={
                <SearchOutlined
                  className={`${
                    isProductPage
                      ? "text-white"
                      : scrolled || isIntendedPage
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                />
              }
              onClick={toggleSearch}
              className={`h-8 w-8 flex items-center justify-center p-0 ${
                isProductPage
                  ? "hover:bg-gray-800/30"
                  : scrolled || isIntendedPage
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-800/30"
              }`}
            />
            <Button
              type="text"
              icon={
                <MenuOutlined
                  className={`${
                    isProductPage
                      ? "text-white"
                      : scrolled || isIntendedPage
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                />
              }
              onClick={toggleDrawer}
              className={`h-8 w-8 flex items-center justify-center p-0 ${
                isProductPage
                  ? "hover:bg-gray-800/30"
                  : scrolled || isIntendedPage
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-800/30"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Secondary header for product pages */}
      {isProductPage && productTitle && (
        <div className="w-full">
          <SecondaryHeader
            title={productTitle}
            sections={productSections}
            cta={productCtaButton}
          />
        </div>
      )}

      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={drawerVisible}
        width={300}
        styles={{ header: { borderBottom: "1px solid #f0f0f0" } }}
      >
        <Menu
          mode="inline"
          style={{ borderRight: 0 }}
          defaultOpenKeys={[]}
          items={[
            // @ts-expect-error fix soon
            ...mainMenuItems,
            // @ts-expect-error fix soon
            {
              key: "mobile-search",
              label: (
                <div onClick={toggleSearch}>
                  <span>Pencarian</span>
                </div>
              ),
              icon: <SearchOutlined />,
              onClick: () => {
                toggleDrawer();
                toggleSearch();
              },
            },
            {
              key: "mobile-account",
              label: "Akun",
              // @ts-expect-error fix soon
              children: [
                {
                  key: "mobile-login",
                  label: <Link href="/auth/login">Masuk</Link>,
                },
                {
                  key: "mobile-register",
                  label: <Link href="/auth/register">Daftar</Link>,
                },
              ],
            },
            // @ts-expect-error fix soon
            {
              key: "mobile-cart",
              label: <Link href="/cart">Keranjang Belanja</Link>,
            },
          ]}
        />
      </Drawer>

      <div
        className={`fixed bg-white z-50 transition-all duration-300 flex flex-col ${
          searchVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!searchVisible}
      >
        <div className="max-w-7xl mx-auto w-full px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Pencarian</h2>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={toggleSearch}
              className="text-xl"
            />
          </div>
          <Search
            placeholder="Cari produk, kategori, atau artikel..."
            enterButton={<Button type="primary">Cari</Button>}
            size="large"
            onSearch={(value) => {
              console.log(value);
              toggleSearch();
              // Implement search logic here
            }}
            autoFocus={searchVisible}
          />
        </div>
      </div>

      <style jsx global>{`
        .products-mega-menu {
          width: 90vw;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 0;
          margin-top: 0rem;
          ${isProductPage && isHovering ? "background-color: #000;" : ""}
        }

        .mega-menu-content {
          background: ${isProductPage && isHovering ? "black" : "white"};
          width: 100%;
        }

        .category-list li.active {
          background-color: ${isProductPage && isHovering
            ? "#1f2937"
            : "#f3f4f6"};
          position: relative;
        }

        .category-list li.active:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: ${isProductPage && isHovering ? "#fff" : "#000"};
        }

        .custom-nav-link {
          position: relative;
        }

        @media (max-width: 1200px) {
          .products-mega-menu {
            left: -100px;
            width: 900px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
