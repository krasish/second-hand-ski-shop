import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BasicMenu from "./BasicMenu";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Link } from "@mui/material";
import { DownhillSkiing } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import RequireAuth from "./RequireAuth";

const pages = [
  {
    title: "Ski",
    subpages: [
      { title: "Men Ski", toLocation: "/catalog-ski?category=men" },
      { title: "Women Ski", toLocation: "/catalog-ski?category=women" },
      { title: "Kids Ski", toLocation: "/catalog-ski?category=kids" },
    ],
  },
  {
    title: "Ski Boots",
    subpages: [
      { title: "Men Ski Boots", toLocation: "/catalog-ski-boots?category=men" },
      {
        title: "Women Ski Boots",
        toLocation: "/catalog-ski-boots?category=women ",
      },
      {
        title: "Kids Ski Boots",
        toLocation: "/catalog-ski-boots?category=kids",
      },
    ],
  },
  {
    title: "Users",
  },
];

function getAltForUser(user) {
  return `${user?.firstName} ${user?.secondName}`;
}

export default function SkiAppBar({ onLogout }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const user = React.useContext(UserContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToolbarButtonClick = (e) => {
    const path = `/${e.target.innerText?.replace(/\s/g, "-")?.toLowerCase()}`;
    navigate(path);
  };

  const anonymousUserButtons = (
    <>
      <Button sx={{ color: "white" }} onClick={handleToolbarButtonClick}>
        Sign In
      </Button>
      <Button sx={{ mx: 1, color: "white" }} onClick={handleToolbarButtonClick}>
        Sign Up
      </Button>
    </>
  );

  const settings = [
    {
      title: "Profile",
      action: () => {
        navigate(`/users/${user?.id}`);
        handleCloseUserMenu();
      },
    },
    {
      title: "Logout",
      action: () => {
        onLogout();
        handleCloseUserMenu();
      },
    },
  ];

  const loggedUserTooltip = (user) => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={getAltForUser(user)} src={user?.imageUrl} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.title} onClick={setting.action}>
            <Typography textAlign="center">{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static" elevation={3}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Link
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <DownhillSkiing
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            Second-Hand Ski Shop
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
            }}
          >
            {pages.map((page) =>
              page.subpages ? (
                <BasicMenu key={page.title} page={page} />
              ) : (
                <Button
                  sx={{ color: "white" }}
                  key={page.title}
                  onClick={handleToolbarButtonClick}
                >
                  {page.title}
                </Button>
              )
            )}
          </Box>
          <Box
            sx={{
              mr: 3,
              justifyContent: "flex-end",
              display: { xs: "flex" },
            }}
          >
            <RequireAuth>
              <Button
                sx={{
                  backgroundColor: "lightgreen",
                  color: "black",
                  ":hover": { color: "white", background: "green" },
                }}
                onClick={handleToolbarButtonClick}
              >
                Add product
              </Button>
            </RequireAuth>
          </Box>
          <UserContext.Consumer>
            {(value) => {
              return value ? loggedUserTooltip(value) : anonymousUserButtons;
            }}
          </UserContext.Consumer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
