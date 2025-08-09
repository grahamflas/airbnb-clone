"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { format } from "date-fns";

import HeartButton from "../HeartButton";

import { Listing, Reservation } from "@/app/generated/prisma";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Button from "../Button";

interface Props {
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  disabled?: boolean;
  listing: Listing;
  onAction?: (id: string) => void;
  reservation?: Reservation;
}

const ListingCard = ({
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  listing,
  onAction,
  reservation,
}: Props) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId);
  };

  const price = () => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  };

  const reservationDate = () => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  };

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${listing.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={listing.imageSrc}
          />

          <div className="absolute top-3 right-3">
            <HeartButton currentUser={currentUser} listingId={listing.id} />
          </div>
        </div>

        <div className="font-semibold font-lg">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate() || listing.category}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price()}</div>
          {!reservation && <div className="font-light">per night</div>}
        </div>

        {onAction && actionLabel && (
          <Button disabled small label={actionLabel} onClick={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
