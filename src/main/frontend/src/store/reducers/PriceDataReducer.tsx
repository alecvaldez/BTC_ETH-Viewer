import { ACTIONS } from "store/actions/PriceDataActions";
import {
  INITIAL_DATA,
  PriceDataAction,
  PriceDataType,
  PRICE_DATA_SECONDS,
} from "store/models/PriceDataModel";

/**
 * Reducer for all Price Data. Action pushes and updates next state based on arguments
 * @param {PriceDataType} prevState Previous state of the price data
 * @param {PriceDataAction} action The action to perform on the price data
 * @returns {PriceDataType} The next state of the price data
 */
export default function PriceDataReducer(
  prevState = INITIAL_DATA,
  action: PriceDataAction
): PriceDataType {
  let nextState: PriceDataType;
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.PUSH_PRICE_DATA: {
      const { coinFromExchange, coord } = payload;
      const coin: string = coinFromExchange.split("-")[0];
      const exchange: string = coinFromExchange.split("-")[1];
      const priceData = prevState[coin][exchange].serie.data;
      if (priceData.length >= PRICE_DATA_SECONDS) priceData.shift();
      nextState = {
        ...prevState,
        [coin]: {
          ...prevState[coin],
          [exchange]: {
            ...prevState[coin][exchange],
            serie: {
              ...prevState[coin][exchange].serie,
              data: [...priceData, coord],
            },
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
