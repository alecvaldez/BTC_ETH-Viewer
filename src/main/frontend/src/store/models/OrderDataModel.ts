import { COLORS } from "Consts";

/**
 * Defines the action for order data in the store
 * @interface
 * @property {string} type The Action type to perform on the order data
 * @property {OrderPayload} payload The payload or data to push to the order data
 */
export interface OrderDataAction {
  type: string;
  payload: OrderPayload;
}

/**
 * Defines the payload for a Order Data Action
 * @interface
 * @property {string} coinFromExchange The Coin and its Exchange appended in one string
 * @property {Coord} coord The coordinate for the graph to add to the order data
 */
export interface OrderPayload {
  coinFromExchange: string;
  order: Order;
}

/**
 * Defines an Exchange which contains a serie or graphing points and endpoint to fetch
 * @interface
 * @property {Order[]} orderData The array of data values for the Order Book
 * @property {string} color The assigned color for the order book
 * @property {string} endpoint The endpoint to fetch in order to populate the Order Book
 */
interface Exchange {
  orderData: Order[];
  color: string;
  endpoint: string;
}

/**
 * Defines an Order type
 * @interface
 * @property {string} bidSize The string representation of the bid size
 * @property {string} bidPrice The string representation of the bid price
 * @property {string} askPrice The string representation of the ask price
 * @property {string} askSize The string representation of the ask size
 * @property {Date}  date The date in which this order was placed
 */
export interface Order {
  bidSize: string;
  bidPrice: string;
  askPrice: string;
  askSize: string;
  date: Date;
}
/**
 * Maps each exchange name to an Exchange Type
 * @type
 */
export type CoinExchangeMap = { [exchangeName: string]: Exchange };

/**
 * Maps each coin to the map of exchanges
 * @type
 */
export type OrderDataType = { [coinName: string]: CoinExchangeMap };

/**
 * Initial Order Data for Store
 * @type
 */
export const INITIAL_DATA: OrderDataType = {
  Bitcoin: {
    Binance: {
      orderData: [],
      color: COLORS["Binance"],
      endpoint:
        "https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT",
    },
    Coinbase: {
      orderData: [],
      color: COLORS["Coinbase"],
      endpoint:
        "https://api.exchange.coinbase.com/products/BTC-USD/book?level=1",
    },
  },
  Ethereum: {
    Binance: {
      orderData: [],
      color: COLORS["Binance"],
      endpoint:
        "https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHUSDT",
    },
    Coinbase: {
      orderData: [],
      color: COLORS["Coinbase"],
      endpoint:
        "https://api.exchange.coinbase.com/products/ETH-USD/book?level=1",
    },
  },
};

/**
 * The amount of last orders to maintain in the order table
 * @constant
 */
export const ORDER_DATA_AMOUNT = 6;
