import { ACTIONS } from "store/actions/OrderDataActions";
import {
  INITIAL_DATA,
  OrderDataAction,
  OrderDataType,
  ORDER_DATA_AMOUNT,
} from "store/models/OrderDataModel";

/**
 * Reducer for all Order Data. Action pushes and updates next state based on arguments
 * @param {OrderDataType} prevState Previous state of the order data
 * @param {OrderDataAction} action The action to perform on the order data
 * @returns {OrderDataType} The next state of the order data
 */
export default function OrderDataReducer(
  prevState = INITIAL_DATA,
  action: OrderDataAction
): OrderDataType {
  let nextState: OrderDataType;
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.PUSH_ORDER_DATA: {
      const { coinFromExchange, order } = payload;
      const coin: string = coinFromExchange.split("-")[0];
      const exchange: string = coinFromExchange.split("-")[1];
      const orderData = prevState[coin][exchange].orderData;
      if (orderData.length >= ORDER_DATA_AMOUNT) orderData.pop();
      nextState = {
        ...prevState,
        [coin]: {
          ...prevState[coin],
          [exchange]: {
            ...prevState[coin][exchange],
            orderData: [order, ...orderData],
          },
        },
      };
      break;
    }
    default:
      nextState = prevState;
  }
  return nextState;
}
