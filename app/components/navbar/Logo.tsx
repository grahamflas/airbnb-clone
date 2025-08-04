"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={100}
      onClick={() => router.push("/")}
      src="/images/logo.png"
      width={100}
    />
  );
};

export default Logo;
