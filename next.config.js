const withFonts = require("next-fonts");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const COMMON = {
  enableSvg: true,
  webpack(config, options) {
    return {
      ...config,
    };
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withFonts({
      ...defaultConfig,
      ...COMMON,
      env: {
        DB_USER: "admin",
        DB_PASS: "SharkShark123",
        JWT_SECRET: "sFznmBPx473rYrlgK+ygroKva805ZybeYTA95Y1W8H0=",
      },
    });
  }

  return withFonts({
    ...defaultConfig,
    ...COMMON,
  });
};
