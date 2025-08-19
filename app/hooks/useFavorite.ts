import { useRouter } from "next/navigation"

import axios from "axios"
import toast from "react-hot-toast"

import useLoginModal from "./useLoginModal"

import { User } from "../generated/prisma";

interface IUseFavorite {
  currentUser?: User | null;
  listingId: string;
}

const useFavorite = ({
  currentUser,
  listingId
}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = () => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId);
  }

  const toggleFavorite = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if(!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited()) {
        request = () => axios.delete(`/api/favorites/${listingId}`)
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`)
      }

      await request();

      router.refresh();

      toast.success(`Success`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
    }
  }

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
