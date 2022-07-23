import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const pages = [
  ["Home", "/home"],
  ["Settings", "/settings"],
  ["Logout", "/logout"],
];

const rightNavLinks = [
  ["Login", "/login"],
  ["Register", "/register"],
];

const NavBarComponent = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                sx={{ my: 2, color: "white", display: "block" }}
                href={page[1]}
              >
                {page[0]}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              right: "0%",
              position: "absolute",
              display: { xs: "none", md: "flex" },
            }}
          >
            {" "}
            {rightNavLinks.map((navigationLink) => (
              <Button
                key={navigationLink[0]}
                sx={{ my: 2, color: "white", display: "block" }}
                href={navigationLink[1]}
              >
                {navigationLink[0]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarComponent;
