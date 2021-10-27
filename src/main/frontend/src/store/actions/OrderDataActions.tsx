import { AnyAction } from "redux";
import { OrderPayload } from "store/models/OrderDataModel";

/**
 * The Actions that are available to perform on the order data
 * @constant
 */
export const ACTIONS = {
  PUSH_ORDER_DATA: "PUSH_ORDER_DATA",
};

/**
 * Action creator for the price data to push order information to the order data map
 * @returns {AnyAction} The action payload
 */
const pushOrderData = (payload: OrderPayload): AnyAction => ({
  type: ACTIONS.PUSH_ORDER_DATA,
  payload: payload,
});

export { pushOrderData };
