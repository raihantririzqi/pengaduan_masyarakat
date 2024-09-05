import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/navigation/navigation";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const header = headersList.get('x-url');
  let route = '/';

  if (header) {
    const url = new URL(header);
    route = url.pathname;
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-right" />
          <div className="flex min-h-screen w-full flex-col">
            {children}
          </div>
      </body>
    </html>
  );
}
