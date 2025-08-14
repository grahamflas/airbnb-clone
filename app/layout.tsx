import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { Toaster } from "react-hot-toast";

import LoginModal from "./components/modals/LoginModal";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

import getCurrentUser from "./actions/getCurrentUser";

import "./globals.css";

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

        <RentModal />

        <SearchModal />

        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
