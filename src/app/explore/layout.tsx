
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import NewFooter from "@/components/layout/NewFooter";

export const metadata: Metadata = {
  title: "Insta360 Indonesia",
  description: "Official Insta360 Indonesia Website",
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header id="root-header" />
      <main className="flex-grow" style={{marginTop: '-64px'}}>{children}</main>
      <NewFooter />
    </div>
  );
}
