"use client";

import { useMemo } from "react";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

import { categories } from "@/app/components/navbar/Categories";

import type { Category } from "@/app/components/navbar/Categories";
import type { Listing, Reservation } from "@/app/generated/prisma";
import { SafeUser } from "@/app/types";

interface Props {
  currentUser: SafeUser | null;
  listing: Listing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
}

// called ListingClient in docs
const ListingShow = ({ currentUser, listing }: Props) => {
  const category: Category | undefined = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing]);

  return (
    <Container>
      <div className="pt-24 max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            currentUser={currentUser}
            id={listing.id}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            title={listing.title}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              bathroomCount={listing.bathroomCount}
              category={category}
              description={listing.description}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
              roomCount={listing.roomCount}
              user={listing.user}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingShow;
