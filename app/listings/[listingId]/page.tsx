import EmptyState from "@/app/components/EmptyState";
import ListingShow from "./ListingShow";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface Params {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingShow
      currentUser={currentUser}
      listing={listing}
      reservations={reservations}
    />
  );
};

export default ListingPage;
