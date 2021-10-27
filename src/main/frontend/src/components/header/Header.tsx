import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

/**
 * The Header component contains the a toolbar and the name and logo of the App
 */
const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#191919" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <DonutLargeIcon
              sx={{ transform: "scale(1.4)", color: "#0047ab" }}
            />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontSize: "23pt" }}
          >
            Coin Viewer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
