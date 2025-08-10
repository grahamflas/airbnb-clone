"use client";

import Image from "next/image";

import { SafeUser } from "@/app/types";

import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface Props {
  currentUser?: SafeUser | null;
  id: string;
  imageSrc: string;
  locationValue: string;
  title: string;
}

const ListingHead = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}: Props) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          className="object-cover w-full"
          fill
          src={imageSrc}
        />

        <div className="absolute top-5 right-5">
          <HeartButton currentUser={currentUser} listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
