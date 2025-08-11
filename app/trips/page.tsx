import EmptyState from "../components/EmptyState";
import TripsShow from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No tips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  return <TripsShow currentUser={currentUser} reservations={reservations} />;
};

export default TripsPage;
