import React, { useState } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
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
import { useSelector, useDispatch } from 'react-redux'
import HomeIcon from '../static/home.png'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(4)
  },
  menuListItem: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(0),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "80px"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  sectionDesktop: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  appBar:{
    backgroundColor: "#FFF"
  },
  title: {
      fontSize: "22px",
      fontFamily: "branding-bold",
      color: "#373737",
  },
  menuItem: {
    fontSize: "26px",
    fontFamily: "branding-medium",
    color: "#373737",
  }
}));

function CustomMenu() {

  const [anchorEl, setAchorEl] = useState(false)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false)

  const isAuth = useSelector(state => state.isAuthenticated)
  const state = useSelector(state => state)
  console.log(state, "menu")
  const dispatch = useDispatch()

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
    console.log(state)

    if (isAuth) {
      logout();
      dispatch({ type: 'LOGOUT'})
      console.log(state)
    }
    else history.push("/signIn");
  }

  function handleSignUpClick() {
      history.push("/signUp");
  }

  function toPage(pagePath){
    history.push(pagePath)
  }

    const classes = useStyles();
    const isMenuOpen = Boolean(anchorEl);
    
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <SwipeableDrawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        onOpen={handleMobileMenuOpen}
      >

        <List>
          {!isAuth &&
          <ListItem className={classes.menuListItem} button key="Menu">
            <Button
                  variant="outlined"
                  className={classes.button}
                  endIcon={<AccountCircle />}
                  onClick={handleSignUpClick}
                  disableElevation
                >
                  Criar conta
            </Button>
          </ListItem>
          }         
          <ListItem className={classes.menuListItem} button key="Menu">
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Competição" />
          </ListItem>
        
        </List>
        <Divider />
      </SwipeableDrawer>

    );

    return (
      <div className={classes.grow}>
        <AppBar elevation={0} className={classes.appBar} position="static">
          <Toolbar>
            <Grid container>
              
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="#373737"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Grid item>
                <h1 className={classes.title}>3L's</h1>
            </Grid>
            <Grid item className={classes.sectionDesktop}>
              <Grid item>
                  <img src={HomeIcon}/>
                  <a className={classes.menuItem}>Home</a>
                </Grid>
            </Grid>
            <div className={classes.grow} />
            {isAuth &&
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AccountCircle />}
                onClick={handleSessionClick}
                disableElevation
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
                disableElevation
              >
                Entrar
             </Button>
            }
            {!isAuth &&
              <div className={classes.sectionDesktop}>
              <Button
                variant="outlined"
                className={classes.button}
                endIcon={<AccountCircle />}
                onClick={handleSignUpClick}
                disableElevation
              >
                Criar conta
             </Button>
            </div>
            }
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
}

export default withStyles(useStyles)(CustomMenu);
