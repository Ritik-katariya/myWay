import Footer from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My personal portfolio showcasing my projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="sticky top-0 left-0 w-full z-50">
          <Header />
        </div>
        {children}
        <div>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
