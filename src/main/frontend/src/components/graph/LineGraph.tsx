import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Point, ResponsiveLine, Serie } from "@nivo/line";
import React from "react";

/**
 * The props for the ToolTip
 * @interface
 * @property {Point} point Contains the point x and y data for the tooltip div
 */
interface ToolTipProps {
  point: Point;
}

/**
 * The ToolTip component displays the point value and date on the graph when hovering
 * over a line
 */
const ToolTip: React.FC<ToolTipProps> = ({ point }: ToolTipProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: 150,
          height: 50,
        },
        width: 150,
        height: 50,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          backgroundColor: "#121212",
          borderRadius: 2,
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ShowChartIcon
              sx={{
                color: point.serieColor,
                paddingTop: 1.5,
                paddingLeft: 1,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 12,
                paddingTop: 1,
              }}
            >
              Price: {point.data.yFormatted}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 12,
                paddingTop: 0,
              }}
            >
              Time: {point.data.xFormatted}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

/**
 * The props inherited from the component declaration
 * @interface
 * @property {Serie[]} series The array of data point arrays to plot on the graph
 */
interface OwnProps {
  series: Serie[];
}

/**
 * The props that the LineGraph will utilize
 * @interface
 */
interface LineGraphProps extends OwnProps {}

/**
 * The LineGraph component contains a nivo responsive line that tracks price data for the coin in question
 */
const LineGraph: React.FC<LineGraphProps> = ({ series }: LineGraphProps) => {
  return (
    <ResponsiveLine
      data={series}
      margin={{ top: 5, right: 140, bottom: 50, left: 100 }}
      xScale={{
        format: "%Y-%m-%dT%H:%M:%S.%L%Z",
        type: "time",
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      }}
      yFormat={(v) => `$${Number(v).toFixed(2)}`}
      xFormat="time:%H:%M:%S"
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%S",
        legend: "Time (seconds)",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      theme={{
        background: "#121212",
        textColor: "#fff",
        crosshair: {
          line: {
            stroke: "#fff",
          },
        },
      }}
      sliceTooltip={({ slice }) => (
        <div>
          {slice.points.map((point) => (
            <div>X Value: {point.data.xFormatted}</div>
          ))}
        </div>
      )}
      tooltip={(point) => <ToolTip point={point.point} />}
      axisLeft={{
        format: (v) => `$${v}`,
        tickSize: 20,
        tickPadding: 13,
        tickRotation: 0,
        legend: "Price (USD)",
        legendOffset: -80,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ datum: "color" }}
      lineWidth={3}
      pointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 140,
          translateY: 0,
          itemsSpacing: 2,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 12,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineGraph;
