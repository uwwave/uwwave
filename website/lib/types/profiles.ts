export enum ProfilePicture {
  P1 = "/profile-1.jpg",
}

export const legalProfiles: string[] = [ProfilePicture.P1];

export const getProfileImage = (imageUrl?: string): string => {
  return legalProfiles.includes(imageUrl ?? "")
    ? imageUrl ?? ""
    : ProfilePicture.P1;
};
