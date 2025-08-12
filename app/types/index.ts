import { User } from "../generated/prisma";

export type SafeUser = Omit<
  User,
  "createdAt" |
  "emailVerified" |
  "updatedAt"
> & {
  createdAt: string;
  emailVerified: string | null;
  updatedAt: string;
}

export type CategoryLabel =
  "Arctic" |
  "Barns" |
  "Beach" |
  "Camping" |
  "Castle" |
  "Cave" |
  "Countryside" |
  "Desert" |
  "Islands" |
  "Lake" |
  "Lux" |
  "Modern" |
  "Pools" |
  "Skiing" |
  "Windmills";
