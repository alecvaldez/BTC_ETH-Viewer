import { Grid } from "@mui/material";
import "App.css";
import Display from "components/display/Display";
import CoinPriceGraph from "components/graph/CoinPriceGraph";
import Header from "components/header/Header";
import OrderBook from "components/orderbook/OrderBook";
import React from "react";
import { connect } from "react-redux";
import { OrderDataType } from "store/models/OrderDataModel";
import { PriceDataType } from "store/models/PriceDataModel";
import { StoreType } from "store/Store";

/**
 * The props inherited from the Store
 * @interface
 * @property {PriceDataType} priceData The price data map of all Exchange's price data
 * @property {OrderDataType} priceData The order data map of all Exchange's order data
 */
interface StateProps {
  priceData: PriceDataType;
  orderData: OrderDataType;
}

/**
 * The props that the App will utilize
 * @interface
 */
interface AppProps extends StateProps {}

/**
 * The Main component to the Application. Contains a Grid based structure and has the
 * Display, Header, Orderbook and Graph components nested within
 */
const App: React.FC<AppProps> = ({ priceData, orderData }: AppProps) => {
  return (
    <Grid
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Header />
      <Grid
        container
        spacing={20}
        sx={{ justifyContent: "center", marginTop: -15 }}
      >
        {Object.entries(priceData).map(([coin, coinExchangeMap]) => {
          return (
            <Grid
              item
              xs={5}
              sx={{
                height: "30em",
              }}
              key={coin + "graph"}
            >
              <CoinPriceGraph
                coinName={coin}
                series={Object.values(coinExchangeMap).map(
                  (exchange) => exchange.serie
                )}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        spacing={20}
        sx={{ justifyContent: "center", marginTop: -15 }}
      >
        {Object.entries(orderData).map(([coin, coinExchangeMap]) => {
          return (
            <Grid
              item
              xs={5}
              sx={{
                height: "30em",
              }}
              key={coin + "display"}
            >
              <Display coinName={coin} coinExchangeMap={coinExchangeMap} />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        spacing={20}
        sx={{ justifyContent: "center", marginTop: -33 }}
      >
        {Object.entries(orderData).map(([coin, coinExchangeMap]) => {
          return (
            <Grid
              item
              xs={5}
              sx={{
                height: "30m",
              }}
              key={coin + "orderbook"}
            >
              <OrderBook coinName={coin} coinExchangeMap={coinExchangeMap} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ priceData, orderData }: StoreType): StateProps => {
  return {
    priceData: priceData,
    orderData: orderData,
  };
};

export default connect(mapStateToProps)(App);
