"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface Props {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton = ({ currentUser, listingId }: Props) => {
  const hasFavorited = false;
  const toggleFavorite = () => {};

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        className="fill-white absolute -top-[2px] -right-[2px]"
        size={28}
      />

      <AiFillHeart
        className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
        size={24}
      />
    </div>
  );
};

export default HeartButton;
