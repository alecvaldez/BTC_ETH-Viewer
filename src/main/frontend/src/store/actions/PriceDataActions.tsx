import { AnyAction } from "redux";
import { PricePayload } from "store/models/PriceDataModel";

/**
 * The Actions that are available to perform on the price data
 * @constant
 */
export const ACTIONS = {
  PUSH_PRICE_DATA: "PUSH_PRICE_DATA",
};

/**
 * Action creator for the price data to push price information to the price data map
 * @returns {AnyAction} The action payload
 */
const pushPriceData = (payload: PricePayload): AnyAction => ({
  type: ACTIONS.PUSH_PRICE_DATA,
  payload: payload,
});

export { pushPriceData };
