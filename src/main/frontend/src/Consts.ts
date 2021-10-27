/**
 * Path in public folder for all coin images
 * @constant
 */
export const COIN_IMAGE_PATH = "/coin-svg/";

/**
 * Extension for coin images
 * @constant
 */
export const COIN_IMAGE_TYPE = ".svg";

/**
 * Map for assigning colors to Exchanges for improved color normalization
 * @type
 */
type ColorMap = { [coinName: string]: string };

/**
 * Map of each coin and thier respective color
 * @constant
 */
export const COLORS: ColorMap = {
  Binance: "hsl(220, 70%, 50%)",
  Coinbase: "hsl(19, 100%, 51%)",
};

/**
 * Map for assigning coins to their tags
 * @type
 */
type TagType = { [coinName: string]: string };

/**
 * Map of each coin and thier respective Tag
 * @constant
 */
export const TAGS: TagType = {
  Bitcoin: "BTC",
  Ethereum: "ETH",
};
