"use client";

import Image from "next/image";

interface Props {
  src: string | null | undefined;
}

const Avatar = ({ src }: Props) => {
  const imageSrc = src || "/images/placeholder.jpg";

  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={imageSrc}
    />
  );
};

export default Avatar;
