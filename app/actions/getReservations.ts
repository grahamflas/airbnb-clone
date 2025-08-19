import prisma from "@/app/libs/prismadb"

import { ReservationWithListing } from "../trips/TripsClient";

interface Params {
  hostId?: string;
  listingId?: string;
  userId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Query  = Record<string, any>;

export default async function getReservations(params: Params): Promise<ReservationWithListing[]> {
  try {

    const {
      hostId,
      listingId,
      userId,
    } = await params;

    const query: Query = {};

    if (hostId) {
      query.listing = { userId: hostId}
    }

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        startDate: "asc",
      }
    });

    return reservations
  } catch (error: unknown) {
    console.log(error)
    throw new Error("Something went wrong");
  }
}
