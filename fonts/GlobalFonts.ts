import { createGlobalStyle } from "styled-components";
import { Fonts } from "fonts/fontKeys";
import OswaldRegularFont from "public/fonts/Oswald-Regular.ttf";
import BayonRegularFont from "public/fonts/Bayon-Regular.ttf";
import GreatLakesNFFont from "public/fonts/GreatLakesNF.ttf";
import SpantaranFont from "public/fonts/Spantaran.ttf";
import GraviconFont from "public/fonts/Gravicon.ttf";
import CommandoFont from "public/fonts/Commando.ttf";
import BallbaseFont from "public/fonts/Ballbase.ttf";
import StaatlichesFont from "public/fonts/Staatliches.ttf";
import LeagueSpartanFont from "public/fonts/LeagueSpartan.ttf";
import KarantinaFont from "public/fonts/Karantina.ttf";
import ThunderFont from "public/fonts/Thunder.ttf";
import MidnightDrive from "public/fonts/MidnightDrive.ttf";

export const getFontResource = (font: string) => {
  switch (font) {
    case Fonts.OSWALD_REGULAR:
      return OswaldRegularFont;
    case Fonts.BAYON_REGULAR:
      return BayonRegularFont;
    case Fonts.GREAT_LAKES_NF:
      return GreatLakesNFFont;
    case Fonts.SPANTARAN:
      return SpantaranFont;
    case Fonts.GRAVICON:
      return GraviconFont;
    case Fonts.COMMANDO:
      return CommandoFont;
    case Fonts.BALLBASE:
      return BallbaseFont;
    case Fonts.STAATLICHES:
      return StaatlichesFont;
    case Fonts.LEAGUE_SPARTAN:
      return LeagueSpartanFont;
    case Fonts.KARANTINA:
      return KarantinaFont;
    case Fonts.THUNDER:
      return ThunderFont;
    case Fonts.MIDNIGHT_DRIVE:
      return MidnightDrive;
    default:
      return OswaldRegularFont;
  }
};
const generateTTFFontFace = (name: string, font: any) => {
  return `@font-face {
        font-family: '${name}';
        src: local('${name}'), 
        url(${font}) format('truetype');
    }
    `;
};
export default createGlobalStyle`
    ${generateTTFFontFace(Fonts.OSWALD_REGULAR, OswaldRegularFont)}
    ${generateTTFFontFace(Fonts.BAYON_REGULAR, BayonRegularFont)}
    ${generateTTFFontFace(Fonts.GREAT_LAKES_NF, GreatLakesNFFont)}
    ${generateTTFFontFace(Fonts.SPANTARAN, SpantaranFont)}
    ${generateTTFFontFace(Fonts.GRAVICON, GraviconFont)}
    ${generateTTFFontFace(Fonts.COMMANDO, CommandoFont)}
    ${generateTTFFontFace(Fonts.BALLBASE, BallbaseFont)}
    ${generateTTFFontFace(Fonts.STAATLICHES, StaatlichesFont)}
    ${generateTTFFontFace(Fonts.LEAGUE_SPARTAN, LeagueSpartanFont)}
    ${generateTTFFontFace(Fonts.KARANTINA, KarantinaFont)}
    ${generateTTFFontFace(Fonts.THUNDER, ThunderFont)}
    ${generateTTFFontFace(Fonts.MIDNIGHT_DRIVE, MidnightDrive)}
`;

export interface IFont {
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  src: string;
}

export const fonts: IFont[] = [
  {
    fontFamily: "Thunder",
    fontStyle: "normal",
    fontWeight: `400`,
    src: `local('${Fonts.THUNDER}'), url(${ThunderFont}) format('truetype')`,
  },
];
