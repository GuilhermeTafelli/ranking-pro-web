import React, { useState } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { isAuthenticated, logout } from '../services/Auth'
import history from '../history'

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

function CustomMenu() {

  const [anchorEl, setAchorEl] = useState(false)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false)
  const [isAuth, setIsAuth ] = useState(isAuthenticated)

  function handleProfileMenuOpen(event){
      setAchorEl(event.currentTarget)
  };

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  };

  function handleMenuClose() {
    setMobileMoreAnchorEl(null)
    setAchorEl(null)
  };

  function handleMobileMenuOpen(event) {
      setMobileMoreAnchorEl(event.currentTarget)
  };

  function handleSessionClick() {
    if (isAuth) {
      logout();
      setIsAuth(false)
    }
    else history.push("/signIn");
  }


    const classes = styles;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <SwipeableDrawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        onOpen={handleMobileMenuOpen}
      >
        <List>
          <ListItem button key="Menu">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Competição" />
          </ListItem>
          <ListItem button key="Menu">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Competição" />
          </ListItem>
          <ListItem button key="Menu">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Competição" />
          </ListItem>
          <ListItem button key="Menu">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Competição" />
          </ListItem>
        </List>
        <Divider />
      </SwipeableDrawer>

    );

    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            </div>
            {isAuth &&
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AccountCircle />}
                onClick={handleSessionClick}
              >
                Sair
             </Button>
            }
            {!isAuth &&
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AccountCircle />}
                onClick={handleSessionClick}
              >
                Entrar
             </Button>
            }

          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
}

export default withStyles(styles)(CustomMenu);
