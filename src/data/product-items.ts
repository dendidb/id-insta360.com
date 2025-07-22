export interface ProductItem {
  id: string;
  title: string;
  imageSrc: string;
  hoverImageSrc: string;
  link: string;
}

export const productItems: ProductItem[] = [
  {
    id: "insta360-x4",
    title: "Insta360 X4",
    imageSrc: "/images/products/insta360-x4.png",
    hoverImageSrc: "/images/products/insta360-x4-hover.png",
    link: "/products/x4"
  },
  {
    id: "insta360-ace-pro-2",
    title: "Insta360 Ace Pro 2",
    imageSrc: "/images/products/ace-pro-2.png",
    hoverImageSrc: "/images/products/ace-pro-2-hover.png",
    link: "/products/ace-pro-2"
  },
  {
    id: "insta360-go-3s",
    title: "Insta360 GO 3S",
    imageSrc: "/images/products/insta360-go-3s.png",
    hoverImageSrc: "/images/products/insta360-go-3s-hover.png",
    link: "/products/go-3s"
  },
  {
    id: "insta360-flow-2-pro",
    title: "Insta360 Flow 2 Pro",
    imageSrc: "/images/products/insta360-flow-2-pro.png",
    hoverImageSrc: "/images/products/insta360-flow-2-pro-hover.png",
    link: "/products/flow-2-pro"
  },
  {
    id: "insta360-x3",
    title: "Insta360 X3",
    imageSrc: "/images/products/insta360-x3.png",
    hoverImageSrc: "/images/products/insta360-x3-hover.png",
    link: "/products/x3"
  }
]; 