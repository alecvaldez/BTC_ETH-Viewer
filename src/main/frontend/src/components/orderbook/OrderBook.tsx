import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { CoinExchangeMap } from "store/models/OrderDataModel";

/**
 * The props inherited from the component declaration
 * @interface
 * @property {string} coinName The name of the coin that the orderbook is for
 * @property {CoinExchangeMap} coinExchangeMap Map of the Exchanges order data of the coin
 */
interface OwnProps {
  coinName: string;
  coinExchangeMap: CoinExchangeMap;
}

/**
 * The props that the OrderBook will utilize
 * @interface
 */
interface OrderBookProps extends OwnProps {}

/**
 * The OrderBook component uses a table and will show past ORDER_DATA_AMOUNT order data
 */
const OrderBook: React.FC<OrderBookProps> = ({
  coinName,
  coinExchangeMap,
}: OrderBookProps) => {
  return (
    <Grid
      sx={{
        width: "100%",
        backgroundColor: "#121212",
        borderRadius: "0.6em",
        outline: "0.1em solid rgba(255, 255, 255, 0.712)",
      }}
      container
      direction="row"
    >
      {Object.entries(coinExchangeMap).map(
        ([exchangeName, exchange], index) => {
          return (
            <Grid
              item
              key={exchangeName + coinName}
              sx={{
                width: "50%",
                borderRight:
                  index === 0
                    ? "0.1em solid rgba(255, 255, 255, 0.712)"
                    : undefined,
              }}
            >
              <Toolbar
                sx={{
                  pl: { sm: "25%" },
                  pr: { xs: 1, sm: 1 },
                }}
              >
                <FiberManualRecordIcon
                  sx={{
                    color: exchange.color,
                    paddingRight: 1,
                  }}
                />
                <Typography
                  sx={{ flex: "1 1 100%", color: "#fff" }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  {exchangeName} Orderbook
                </Typography>
              </Toolbar>
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: "#121212",
                }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#121212" }}>
                      <TableCell sx={{ color: "#515151" }}>Bid Size</TableCell>
                      <TableCell align="right" sx={{ color: "#515151" }}>
                        Bid Price
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#515151" }}>
                        Ask Price
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#515151" }}>
                        Ask Size
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exchange.orderData.map((order, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" sx={{ color: "#fff" }}>
                          {Number(order.bidSize).toFixed(2)}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "#fff" }}>
                          ${Number(order.bidPrice).toFixed(2)}
                        </TableCell>
                        <TableCell align="left" sx={{ color: "#fff" }}>
                          ${Number(order.askPrice).toFixed(2)}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "#fff" }}>
                          {Number(order.askSize).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default OrderBook;
