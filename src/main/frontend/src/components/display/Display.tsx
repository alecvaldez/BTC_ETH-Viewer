import { Grid, Icon, Typography } from "@mui/material";
import { COIN_IMAGE_PATH, COIN_IMAGE_TYPE } from "Consts";
import React, { useEffect, useState } from "react";
import { CoinExchangeMap } from "store/models/OrderDataModel";
import { TAGS } from "Consts";

/**
 * The props inherited from the component declaration
 * @interface
 * @property {string} coinName The name of the coin to display
 * @property {CoinExchangeMap} coinExchangeMap The map of coin to Exhcanges
 */
interface OwnProps {
  coinName: string;
  coinExchangeMap: CoinExchangeMap;
}

/**
 * Object type for an exchange and its price for the coin
 * @interface
 * @property {string} exchange The name of the exchange
 * @property {string} price The price of the coin in the exchange
 */
interface PriceExchange {
  exchange: string;
  price: string;
}

/**
 * The props that the Display will utilize
 * @interface
 */
interface DisplayProps extends OwnProps {}

/**
 * The Display component visualizes the best exchanges to buy/sell on and their
 * prices respectively
 */
const Display: React.FC<DisplayProps> = ({
  coinName,
  coinExchangeMap,
}: DisplayProps) => {
  const [buyExchange, setBuyExchange] = useState<PriceExchange>({
    exchange: "",
    price: "",
  });
  const [sellExchange, setSellExchange] = useState<PriceExchange>({
    exchange: "",
    price: "",
  });

  useEffect(() => {
    const setBestBuySell = (): void => {
      let buyExchange: string = "";
      let sellExchange: string = "";
      let buyPrice: number = 0;
      let sellPrice: number = 0;

      Object.entries(coinExchangeMap).forEach(([exchangeName, exchange]) => {
        const askPrice: number = Number(exchange.orderData[0].askPrice);
        const bidPrice: number = Number(exchange.orderData[0].bidPrice);
        if (buyPrice === 0 || askPrice < buyPrice) {
          buyExchange = exchangeName;
          buyPrice = askPrice;
        }
        if (sellPrice === 0 || bidPrice > sellPrice) {
          sellExchange = exchangeName;
          sellPrice = bidPrice;
        }
      });
      setBuyExchange({
        exchange: buyExchange,
        price: Number(buyPrice)
          .toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })
          .toString(),
      });
      setSellExchange({
        exchange: sellExchange,
        price: Number(sellPrice)
          .toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })
          .toString(),
      });
    };
    setBestBuySell();
  }, [coinExchangeMap]);

  return (
    <Grid
      sx={{
        width: "100%",
        backgroundColor: "#121212",
        borderRadius: "0.6em",
        outline: "0.1em solid rgba(255, 255, 255, 0.712)",
      }}
      container
      direction="column"
    >
      <Grid
        sx={{
          paddingTop: 2,
          width: "100%",
        }}
        container
        direction="row"
      >
        <Grid item>
          <Icon
            sx={{
              paddingTop: 0,
              transform: "translate(0, -12px) scale(0.4)",
              height: "2.8em",
              width: "2.8em",
              marginTop: 0,
              paddingBottom: 0,
            }}
          >
            <img
              alt=""
              draggable={false}
              src={
                process.env.PUBLIC_URL +
                COIN_IMAGE_PATH +
                coinName.toLowerCase() +
                COIN_IMAGE_TYPE
              }
            />
          </Icon>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{ color: "#fff", display: "inline-block", marginRight: 2 }}
            variant="h4"
          >
            Buy {TAGS[coinName]} on
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              display: "inline-block",
              fontWeight: 600,
            }}
            variant="h4"
          >
            {buyExchange.exchange}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: "green",
              fontWeight: 600,
              display: "inline-block",
            }}
            component="div"
            variant="h4"
          >
            ${buyExchange.price}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        sx={{
          paddingTop: 2,
          width: "100%",
        }}
        container
        direction="row"
      >
        <Grid item>
          <Icon
            sx={{
              paddingTop: 0,
              transform: "translate(0, -12px) scale(0.4)",
              height: "2.8em",
              width: "2.8em",
              marginTop: 0,
              paddingBottom: 0,
            }}
          >
            <img
              alt=""
              draggable={false}
              src={
                process.env.PUBLIC_URL +
                COIN_IMAGE_PATH +
                coinName.toLowerCase() +
                COIN_IMAGE_TYPE
              }
            />
          </Icon>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{ color: "#fff", display: "inline-block", marginRight: 2 }}
            variant="h4"
          >
            Sell {TAGS[coinName]} on
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              display: "inline-block",
              fontWeight: 600,
            }}
            variant="h4"
          >
            {sellExchange.exchange}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: "red",
              fontWeight: 600,
              display: "inline-block",
            }}
            component="div"
            variant="h4"
          >
            ${sellExchange.price}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Display;
