import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsShow from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No tips found"
          subtitle="Looks like you haven't reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsShow currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default TripsPage;
