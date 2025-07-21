import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";

import "./globals.css";
import RegisterModal from "./components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />

        <LoginModal />

        <RegisterModal />

        <Navbar currentUser={currentUser} />

        {children}
      </body>
    </html>
  );
}
