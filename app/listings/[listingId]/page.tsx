import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface Params {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<Params> }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(await params);
  const reservations = await getReservations(await params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      currentUser={currentUser}
      listing={listing}
      reservations={reservations}
    />
  );
};

export default ListingPage;
