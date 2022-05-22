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

const pages = [
  { title: "Ski", subpages: ["Men Ski", "Women Ski", "Kids Ski"] },
  {
    title: "Ski Boots",
    subpages: ["Men Ski Boots", "Women Ski Boots", "Kids Ski Boots"],
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
    const path = `/${e.target.innerText?.replace(/\s/g, "")?.toLowerCase()}`;
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
            {pages.map((page) => (
              <BasicMenu key={page.title} page={page} />
            ))}
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
