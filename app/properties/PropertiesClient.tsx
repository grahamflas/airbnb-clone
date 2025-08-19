"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import { Listing, Reservation, User } from "../generated/prisma";

export type ReservationWithListing = Reservation & {
  listing: Listing;
};

interface Props {
  currentUser: User;
  listings: Listing[];
}

const PropertiesClient = ({ currentUser, listings }: Props) => {
  const router = useRouter();

  const [listingToDeleteId, setListingToDeleteId] = useState("");

  const onCancel = async (id: string) => {
    setListingToDeleteId(id);

    try {
      await axios.delete(`/api/listings/${id}`);

      toast.success("Listing deleted");

      router.refresh();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.error);
      }

      toast.error("Something went wrong");
      console.log("Error", error);
    } finally {
      setListingToDeleteId("");
    }
  };

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="Where you've been and where you're going"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              actionId={listing.id}
              actionLabel="Delete listing"
              onAction={onCancel}
              currentUser={currentUser}
              disabled={listingToDeleteId === listing.id}
              key={listing.id}
              listing={listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
