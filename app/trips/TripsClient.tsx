"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import { Listing, Reservation } from "../generated/prisma";
import { SafeUser } from "../types";
import toast from "react-hot-toast";

export type ReservationWithListing = Reservation & {
  listing: Listing;
};

interface Props {
  currentUser: SafeUser;
  reservations: ReservationWithListing[];
}

const TripsClient = ({ currentUser, reservations }: Props) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(`/api/reservations/${id}`);

      toast.success("Reservation cancelled");

      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div
        onClick={() => onCancel("hi")}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {reservations.map((reservation) => {
          return (
            <ListingCard
              actionId={reservation.id}
              actionLabel="Cancel reservation"
              onAction={onCancel}
              currentUser={currentUser}
              disabled={deletingId === reservation.id}
              key={reservation.id}
              listing={reservation.listing}
              reservation={reservation}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
