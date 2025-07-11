import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/Navbar";

import "./globals.css";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal actionLabel="Submit" isOpen title="Hello World" />

        <Navbar />
        {children}
      </body>
    </html>
  );
}
