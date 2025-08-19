import prisma from "@/app/libs/prismadb"

import getCurrentUser from "./getCurrentUser"

import { Listing, User } from "../generated/prisma";

export default async function getFavorites(): Promise<Listing[]> {
  try {
    const currentUser: User | null = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    return await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while fetching favorites.");
  }
}
