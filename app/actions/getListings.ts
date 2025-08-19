import prisma from "@/app/libs/prismadb"
import { Query } from "./getReservations";

export interface IListingsParams {
  bathroomCount?: number;
  category?: string;
  endDate?: string;
  guestCount?: number;
  locationValue?: string;
  roomCount?: number;
  startDate?: string;
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      bathroomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate,
      userId,
     } = await params;

    const query: Query = {};

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    };

    if (category) {
      query.category = category;
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    };

    if (locationValue) {
      query.locationValue = locationValue;
    };

    if (roomCount) {
      query.roomCount = {
        // transforms roomCount into a number
        gte: +roomCount,
      }
    };

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate}
              },
              {
                endDate: { lte: endDate },
                startDate: { gte: endDate}
              },
            ]
          }
        }
      }
    };

    if (userId) {
      query.userId = userId;
    }

    return await prisma.listing.findMany({
      where: query,
      orderBy: {createdAt: 'desc'}
    });
  } catch (error: unknown) {
    console.log(error)
    throw new Error("Something went wrong");
  }
}
