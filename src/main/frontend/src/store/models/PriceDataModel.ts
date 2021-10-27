import { Serie } from "@nivo/line";
import { COLORS } from "Consts";

/**
 * Defines the action for price data in the store
 * @interface
 * @property {string} type The Action type to perform on the price data
 * @property {PricePayload} payload The payload or data to push to the price data
 */
export interface PriceDataAction {
  type: string;
  payload: PricePayload;
}

/**
 * Defines the payload for a Price Data Action
 * @interface
 * @property {string} coinFromExchange The Coin and its Exchange appended in one string
 * @property {Coord} coord The coordinate for the graph to add to the price data
 */
export interface PricePayload {
  coinFromExchange: string;
  coord: Coord;
}

/**
 * Defines the payload for a Price Data Action
 * @interface
 * @property {Date} x The date at which this coordinate was created
 * @property {string} y The string representation of the price
 */
interface Coord {
  x: Date;
  y: string;
}

/**
 * Defines an Exchange which contains a serie or graphing points and endpoint to fetch
 * @interface
 * @property {Serie} serie The array of data values for the nivo graphing library
 * @property {string} endpoint The endpoint to fetch in order to populate the serie
 */
interface Exchange {
  serie: Serie;
  endpoint: string;
}

/**
 * Maps each exchange name to an Exchange Type
 * @type
 */
type CoinExchangeMap = { [exchangeName: string]: Exchange };

/**
 * Maps each coin to the map of exchanges
 * @type
 */
export type PriceDataType = { [coinName: string]: CoinExchangeMap };

/**
 * Initial Price Data for Store
 * @type
 */
export const INITIAL_DATA: PriceDataType = {
  Bitcoin: {
    Binance: {
      serie: {
        id: "Binance",
        color: COLORS["Binance"],
        data: [],
      },
      endpoint: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    },
    Coinbase: {
      serie: {
        id: "Coinbase",
        color: COLORS["Coinbase"],
        data: [],
      },
      endpoint: "https://api.exchange.coinbase.com/products/BTC-USD/ticker",
    },
  },
  Ethereum: {
    Binance: {
      serie: {
        id: "Binance",
        color: COLORS["Binance"],
        data: [],
      },
      endpoint: "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    },
    Coinbase: {
      serie: {
        id: "Coinbase",
        color: COLORS["Coinbase"],
        data: [],
      },
      endpoint: "https://api.exchange.coinbase.com/products/ETH-USD/ticker",
    },
  },
};

/**
 * The amount of price points to maintain in the graph
 * @constant
 */
export const PRICE_DATA_SECONDS = 20;
