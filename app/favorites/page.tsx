import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";

import { Listing } from "../generated/prisma";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favoritedListings: Listing[] = await getFavorites();

  if (favoritedListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="It looks like you haven't favorited any listings"
      />
    );
  }

  return (
    <FavoritesClient currentUser={currentUser} favorites={favoritedListings} />
  );
};

export default FavoritesPage;
