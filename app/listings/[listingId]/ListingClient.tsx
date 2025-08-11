"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

import type { Category } from "@/app/components/navbar/Categories";
import type { Listing, Reservation } from "@/app/generated/prisma";
import { Range } from "react-date-range";
import { SafeUser } from "@/app/types";

import useLoginModal from "@/app/hooks/useLoginModal";

import { categories } from "@/app/components/navbar/Categories";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface Props {
  currentUser: SafeUser | null;
  listing: Listing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
}

const ListingClient = ({ currentUser, listing, reservations = [] }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category: Category | undefined = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservations = async (): Promise<void> => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    try {
      await axios.post("/api/reservations", {
        endDate: dateRange.endDate,
        listingId: listing.id,
        startDate: dateRange.startDate,
        totalPrice,
      });

      toast.success("Listing reserved!");

      setDateRange(initialDateRange);

      // [TODO] redirect to trips
      router.push("/");
    } catch (error) {
      toast.error("Something when wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
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

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservations}
                price={listing.price}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
