export enum ProfilePicture {
  UW_LOGO_BLACK = "/profiles/uw-logo-black.png",
  UW_LOGO_BLUE = "/profiles/uw-logo-blue.png",
  UW_LOGO_DARKGREY = "/profiles/uw-logo-darkGrey.png",
  UW_LOGO_GOLD = "/profiles/uw-logo-gold.png",
  UW_LOGO_GREEN = "/profiles/uw-logo-green.png",
  UW_LOGO_GREY = "/profiles/uw-logo-grey.png",
  UW_LOGO_ORANGE = "/profiles/uw-logo-orange.png",
  UW_LOGO_PINK = "/profiles/uw-logo-pink.png",
  UW_LOGO_PURPLE = "/profiles/uw-logo-purple.png",
  UW_LOGO_RED = "/profiles/uw-logo-red.png",
  UW_LOGO_TURQ = "/profiles/uw-logo-turq.png",
  UW_LOGO_WHITE = "/profiles/uw-logo-white.png",
  GOOSE_BASE = "/profiles/goose-base.png",
  GOOSE_BUCKET = "/profiles/goose-bucket.png",
  GOOSE_CAP = "/profiles/goose-cap.png",
  GOOSE_CHRISTMAS = "/profiles/goose-christmas.png",
  GOOSE_FEDORA = "/profiles/goose-fedora.png",
  GOOSE_HARDHAT = "/profiles/goose-hardhat.png",
  GOOSE_PINKTIE = "/profiles/goose-pinktie.png",
  GOOSE_SHERIFF = "/profiles/goose-sheriff.png",
}

export const getProfileImage = (imageUrl?: string): string => {
  if (!imageUrl) {
    return ProfilePicture.GOOSE_BASE;
  }
  return isValidProfile(imageUrl) ? imageUrl : ProfilePicture.GOOSE_BASE;
};

export const baseProfileImages = [
  ProfilePicture.UW_LOGO_BLACK,
  ProfilePicture.GOOSE_BASE,
];

const uwLogoProfileImages: string[] = [
  ProfilePicture.UW_LOGO_BLACK,
  ProfilePicture.UW_LOGO_BLUE,
  ProfilePicture.UW_LOGO_DARKGREY,
  ProfilePicture.UW_LOGO_GOLD,
  ProfilePicture.UW_LOGO_GREEN,
  ProfilePicture.UW_LOGO_GREY,
  ProfilePicture.UW_LOGO_ORANGE,
  ProfilePicture.UW_LOGO_PINK,
  ProfilePicture.UW_LOGO_PURPLE,
  ProfilePicture.UW_LOGO_RED,
  ProfilePicture.UW_LOGO_TURQ,
  ProfilePicture.UW_LOGO_WHITE,
];

const gooseLogoProfileImages: string[] = [
  ProfilePicture.GOOSE_BASE,
  ProfilePicture.GOOSE_BUCKET,
  ProfilePicture.GOOSE_CAP,
  ProfilePicture.GOOSE_CHRISTMAS,
  ProfilePicture.GOOSE_FEDORA,
  ProfilePicture.GOOSE_HARDHAT,
  ProfilePicture.GOOSE_PINKTIE,
  ProfilePicture.GOOSE_SHERIFF,
];

export const getBaseImage = (imageURL: string): string => {
  if (gooseLogoProfileImages.includes(imageURL)) {
    return ProfilePicture.GOOSE_BASE;
  }
  return ProfilePicture.UW_LOGO_BLACK;
};

export const getVariantImages = (imageURL: string): string[] => {
  switch (imageURL) {
    case ProfilePicture.GOOSE_BASE:
      return gooseLogoProfileImages;
    default:
      return uwLogoProfileImages;
  }
};

export const isValidProfile = (imageURL: string): boolean => {
  return Object.values(ProfilePicture)
    .map(x => x.toString())
    .includes(imageURL);
};
