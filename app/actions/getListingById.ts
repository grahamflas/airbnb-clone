import prisma from "@/app/libs/prismadb"

interface Params {
  listingId?: string;
}

export default async function getListingById(params: Params){
  try {
    const { listingId } = await params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      }
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error)
  }
}
