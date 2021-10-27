import { Grid, Icon, Typography } from "@mui/material";
import { Serie } from "@nivo/line";
import { COIN_IMAGE_PATH, COIN_IMAGE_TYPE } from "Consts";
import React from "react";
import LineGraph from "./LineGraph";

/**
 * The props inherited from the component declaration
 * @interface
 * @property {string} coinName The name of the coin to plot data
 * @property {Serie[]} series The array of data point arrays to plot
 */
interface OwnProps {
  coinName: string;
  series: Serie[];
}
/**
 * The props for the Coin graph
 * @interface
 */
interface CoinPriceGraphProps extends OwnProps {}

/**
 * The CoinPrice component acts as a wrapper compoennt (HOC) for the LineGraph component.
 * It contains the div for the graph aswell as the name of the coin.
 */
const CoinPriceGraph: React.FC<CoinPriceGraphProps> = ({
  series,
  coinName,
}: CoinPriceGraphProps) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      sx={{
        borderRadius: "0.6em",
        backgroundColor: "#121212",
        outline: "0.1em solid rgba(255, 255, 255, 0.712)",
        paddingTop: "0.6em",
        paddingBottom: "5em",
        paddingLeft: "0.6em",
        paddingRight: "0.6em",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        item
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
          marginTop: 0,
          marginBottom: 0,
          justifyContent: "center",
        }}
      >
        <Icon
          sx={{
            paddingTop: 0,
            transform: "scale(.4)",
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
      <Grid
        item
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: 25,
            paddingTop: 0,
            marginRight: "1em",
          }}
          display="inline"
        >
          {coinName}
        </Typography>
      </Grid>
      <LineGraph series={series} />
    </Grid>
  );
};

export default CoinPriceGraph;
