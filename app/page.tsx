import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";
import EmptyState from "./components/EmptyState";

import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            data={listing}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
}
