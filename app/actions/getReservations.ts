import prisma from "@/app/libs/prismadb"

import { ReservationWithListing } from "../trips/TripsClient";

interface Params {
  hostId?: string;
  listingId?: string;
  userId?: string;
}

interface Query {
  [key: string]: string | Query;
}

export default async function getReservations({
  hostId,
  listingId,
  userId,
}: Params): Promise<ReservationWithListing[]> {
  try {
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
  } catch (error: any) {
    throw new Error(error);
  }
}
