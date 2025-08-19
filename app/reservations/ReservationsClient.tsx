"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import type { ReservationWithListing } from "../trips/TripsClient";
import { User } from "../generated/prisma";

interface Params {
  currentUser?: User;
  reservations: ReservationWithListing[];
}

const ReservationsClient = ({ currentUser, reservations }: Params) => {
  const router = useRouter();
  const [reservationToCancelId, setReservationToCancelId] = useState("");

  const onCancel = async (id: string) => {
    setReservationToCancelId(id);

    try {
      await axios.delete(`/api/reservations/${id}`);

      toast.success("Reservation cancelled");

      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setReservationToCancelId("");
    }
  };

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              actionId={reservation.id}
              actionLabel="Cancel guest reservation"
              onAction={onCancel}
              currentUser={currentUser}
              disabled={reservationToCancelId === reservation.id}
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

export default ReservationsClient;
