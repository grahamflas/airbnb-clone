import prisma from "@/app/libs/prismadb"
import { Query } from "./getReservations";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = await params;

    const query: Query = {};

    if (userId) {
      query.userId = userId;
    }

    return await prisma.listing.findMany({
      where: query,
      orderBy: {createdAt: 'desc'}
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
