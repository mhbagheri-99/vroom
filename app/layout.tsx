import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VROOM",
  description: "Call others as fast as a VROOM",
  icons: {
    icon: "/icons/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      layout: {
        logoImageUrl: "/icons/vroom-logo.svg",
      },
      variables: {
        colorText: "#FFFFFF",
        colorPrimary: "#0E78F9",
        colorBackground: "#1C1F2E",
        colorInputBackground: "#252A41",
        colorInputText: "#FFFFFF",
      },
    }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
