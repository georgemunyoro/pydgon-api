import { Prisma } from "@prisma/client";

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  userName: string;
  email?: string;
  uuid: string;
  isVerified: string;
}

export const generatePrivateUserProfile = ({
  firstName,
  lastName,
  userName,
  email,
  uuid,
  isVerified,
}: Prisma.UserSelect) =>
  Object.freeze({
    firstName,
    lastName,
    userName,
    email,
    uuid,
    isVerified,
  });

export const generatePublicUserProfile = ({ userName, uuid, isVerified }: Prisma.UserSelect) =>
  Object.freeze({
    userName,
    uuid,
    isVerified,
  });
