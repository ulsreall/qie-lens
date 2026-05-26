import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QIE Lens — QIE Blockchain Explorer & Analytics",
  description:
    "Real-time analytics dashboard for QIE Blockchain. Track blocks, transactions, gas prices, and network activity.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "QIE Lens — QIE Blockchain Explorer & Analytics",
    description:
      "Real-time analytics dashboard for QIE Blockchain. Track blocks, transactions, gas prices, and network activity.",
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#020a18]`}>
        {children}
      </body>
    </html>
  );
}
