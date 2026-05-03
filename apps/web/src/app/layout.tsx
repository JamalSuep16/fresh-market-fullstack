import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import CartDrawer from "../components/CartDrawer";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arya Suhara | Fresh Market",
  description: "Beli buah segar langsung dari genggamanmu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* CartDrawer tersedia di seluruh halaman aplikasi */}
        <Toaster position="bottom-right" expand={false} richColors closeButton />
        <CartDrawer />
        {children}
      </body>
    </html>
  );
}