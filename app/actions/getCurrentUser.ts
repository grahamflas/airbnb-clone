import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import prisma from "@/app/libs/prismadb"
import { User } from "../generated/prisma";

export const getSession = async () => {
  // pass the NextAuth config (providers, adapters, session strategy)
  // to getServerSession, used to get the session on the server
  // getServerSession will look for the session token (a JWT),
  // decode it using the config in authOptions,
  // and return a session object
  return await getServerSession(authOptions);
}

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }


    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    })

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: unknown) {
    console.log(error)
    return null;
  }
}

export default getCurrentUser;
