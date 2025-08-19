import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

// interface Params {
//   reservationId?: string;
// }

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }>},
){
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = await params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservationId");
  }

  // [TODO]: test to see what happens if I try to delete a reservation that isn't mine
  //         and for which I'm not the host
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id},
        // This enables the owner of the listing for which the
        // reservation was created (i.e., the Host) to also cancel
        // the reservation.
        { listing: { userId: currentUser.id } },
      ]
    }
  });

  return NextResponse.json(reservation);
}
