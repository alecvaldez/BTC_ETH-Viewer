import { combineReducers, createStore, Store } from "@reduxjs/toolkit";
import { OrderDataType } from "store/models/OrderDataModel";
import { PriceDataType } from "store/models/PriceDataModel";
import OrderDataReducer from "store/reducers/OrderDataReducer";
import PriceDataReducer from "store/reducers/PriceDataReducer";

/**
 * The Store's Type. Contains the type of data the Store will be containing
 * @interface
 * @property {PriceDataType} priceData The price data map of all Exchange's price data
 * @property {OrderDataType} priceData The order data map of all Exchange's order data
 */
export interface StoreType {
  priceData: PriceDataType;
  orderData: OrderDataType;
}

/**
 * Initializes store by combining the reducers for price and order
 * @constant
 */
export const store: Store<StoreType> = createStore(
  combineReducers<StoreType>({
    priceData: PriceDataReducer,
    orderData: OrderDataReducer,
  })
);
