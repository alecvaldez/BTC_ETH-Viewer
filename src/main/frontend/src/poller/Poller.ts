import { pushOrderData } from "store/actions/OrderDataActions";
import { pushPriceData } from "store/actions/PriceDataActions";
import { OrderDataType, ORDER_DATA_AMOUNT } from "store/models/OrderDataModel";
import { PriceDataType, PRICE_DATA_SECONDS } from "store/models/PriceDataModel";
import { store } from "store/Store";

/**
 * Map to correlate coin and its exchange it's respective endpoint to fetch
 * @type
 */
type URLMap = { [coinFromExchange: string]: string };

/**
 * Class that polls all Exchange endpoints for both orders and prices
 */
class Poller {
  private priceUrlMap: URLMap = {};
  private orderUrlMap: URLMap = {};

  /**
   * Constructor for Poller. This will bind the poll functions to this class
   * and initialize the polling asyncronously
   */
  constructor() {
    this.pollPriceEndpoints = this.pollPriceEndpoints.bind(this);
    this.pollOrderEndpoints = this.pollOrderEndpoints.bind(this);
    this.initializePriceData();
    this.initializeOrderData();
    this.pollPriceEndpoints();
    this.pollOrderEndpoints();
  }
  /**
   * Initialized Price Data in the store and extracts endpoint urls from Data
   * @returns void
   */
  private initializePriceData(): void {
    const date = Date.now();

    const priceData: PriceDataType = store.getState().priceData;
    for (const [coin, coinExchangeMap] of Object.entries(priceData)) {
      for (const [exchangeName, exchange] of Object.entries(coinExchangeMap)) {
        const coinFromExchange = coin + "-" + exchangeName;
        this.priceUrlMap[coinFromExchange] = exchange.endpoint;
        this.initializePriceDataPoints(coinFromExchange, date);
      }
    }
  }

  /**
   * Initiailizes the price data points in the coin from exchange map in to all 0s
   * @param  {string} coinFromExchange String of the Coin in question from the Exchange in question
   * @param  {number} date The date of initialized in the above function to initialize data points
   * @returns void
   */
  private initializePriceDataPoints(
    coinFromExchange: string,
    date: number
  ): void {
    for (let i = 0; i < PRICE_DATA_SECONDS; i++) {
      const x = new Date(date - (PRICE_DATA_SECONDS - i) * 1000);
      store.dispatch(
        pushPriceData({
          coinFromExchange: coinFromExchange,
          coord: {
            x: x,
            y: "0",
          },
        })
      );
    }
  }

  /**
   * Initialized Order Data in the store and extracts endpoint urls from Data
   * @returns void
   */
  private initializeOrderData(): void {
    const date = Date.now();

    const orderData: OrderDataType = store.getState().orderData;
    for (const [coin, coinExchangeMap] of Object.entries(orderData)) {
      for (const [exchangeName, exchange] of Object.entries(coinExchangeMap)) {
        const coinFromExchange = coin + "-" + exchangeName;
        this.orderUrlMap[coinFromExchange] = exchange.endpoint;
        this.initializeOrderDataPoints(coinFromExchange, date);
      }
    }
  }

  /**
   * Initiailizes the order data points in the coin from exchange map in to all 0s
   * @param  {string} coinFromExchange String of the Coin in question from the Exchange in question
   * @param  {number} date The date of initialized in the above function to initialize data points
   * @returns void
   */
  private initializeOrderDataPoints(
    coinFromExchange: string,
    date: number
  ): void {
    for (let i = 0; i < ORDER_DATA_AMOUNT; i++) {
      const newDate = new Date(date - (ORDER_DATA_AMOUNT - i) * 1000);
      store.dispatch(
        pushOrderData({
          coinFromExchange: coinFromExchange,
          order: {
            bidSize: "0",
            bidPrice: "0",
            askPrice: "0",
            askSize: "0",
            date: newDate,
          },
        })
      );
    }
  }

  /**
   * Polls all endpoints set in the stores price data map and pushes to each data array
   * @returns Promise
   */
  private async pollPriceEndpoints(): Promise<void> {
    try {
      await Promise.all(
        Object.entries(this.priceUrlMap).map(async ([coinFromExchange, url]) =>
          this.fetchAndPushPriceData(coinFromExchange, url)
        )
      );
    } catch (error: unknown | Error) {
      console.log(error);
      throw error;
    }
    setTimeout(() => this.pollPriceEndpoints(), 1000);
  }

  /**
   * Polls all endpoints set in the stores order data map and pushes to each data array
   * @returns Promise
   */
  private async pollOrderEndpoints(): Promise<void> {
    try {
      await Promise.all(
        Object.entries(this.orderUrlMap).map(async ([coinFromExchange, url]) =>
          this.fetchAndOrderPriceData(coinFromExchange, url)
        )
      );
    } catch (error: unknown | Error) {
      console.log(error);
      throw error;
    }
    setTimeout(() => this.pollOrderEndpoints(), 1000);
  }

  /**
   * Fetches individual url passed in and pushes response data to price data
   * @param  {string} coinFromExchange String of the Coin in question from the Exchange in question
   * @param  {string} url Endpoint to fetch
   * @returns Promise
   */
  private async fetchAndPushPriceData(
    coinFromExchange: string,
    url: string
  ): Promise<void> {
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const payload = {
          coinFromExchange: coinFromExchange,
          coord: {
            x: new Date(),
            y: json.price || json.data.amount,
          },
        };
        store.dispatch(pushPriceData(payload));
      });
  }

  /**
   * Fetches individual url passed in and pushes response data to order data
   * @param  {string} coinFromExchange String of the Coin in question from the Exchange in question
   * @param  {string} url Endpoint to fetch
   * @returns Promise
   */
  private async fetchAndOrderPriceData(
    coinFromExchange: string,
    url: string
  ): Promise<void> {
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const payload = {
          coinFromExchange: coinFromExchange,
          order: {
            bidSize: json.bidQty || json.bids[0][1],
            bidPrice: json.bidPrice || json.bids[0][0],
            askPrice: json.askPrice || json.asks[0][0],
            askSize: json.askQty || json.asks[0][1],
            date: new Date(),
          },
        };
        store.dispatch(pushOrderData(payload));
      });
  }
}

export default Poller;
