import prisma from "@/app/libs/prismadb"

interface Params {
  authorId?: string;
  listingId?: string;
  userId?: string;
}

interface Query {
  [key: string]: string | Query;
}

export default async function getReservations({
  authorId,
  listingId,
  userId,
}: Params) {
  try {
    const query: Query = {};

    if (authorId) {
      query.listing = { userId: authorId}
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
