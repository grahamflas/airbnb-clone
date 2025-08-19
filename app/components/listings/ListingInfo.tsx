"use client";

import dynamic from "next/dynamic";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

import type { Category } from "../navbar/Categories";
import { User } from "@/app/generated/prisma";

import useCountries from "@/app/hooks/useCountries";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface Props {
  bathroomCount: number;
  category: Category | undefined;
  description: string;
  guestCount: number;
  locationValue: string;
  roomCount: number;
  user: User;
}

const ListingInfo = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}: Props) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>

          <Avatar src={user.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>

          <div>{roomCount} rooms</div>

          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          description={category.description}
          icon={category.icon}
          label={category.label}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
