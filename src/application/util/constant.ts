export const IS_CSR = typeof window !== "undefined";

export const DOMAIN = IS_CSR ? window.location.origin : "";

export const twitterUrl = "https://twitter.com/thismeme_team";

export const instagramUrl = "https://www.instagram.com/thismeme.team";

export const channelUrl = "https://thismeme.channel.io/lounge";

export const Z_INDEX = {
  header: "z-[10]",
};
