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
import HomeIcon from '../static/home.svg'
import RankIcon from '../static/rank.svg'
import ClassIcon from '../static/class.svg'
import ForumIcon from '../static/forum.svg'
import { Home } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(4)
    },
    menuListItem: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(0),
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
    appBar: {
        backgroundColor: "#FFF",
        boxShadow: "0 0 1em rgba(0, 0, 0, 0.09)"
    },
    title: {
        fontSize: "50px",
        fontFamily: "branding-bold",
        color: "#373737",
    },
    menuItem: {
        textDecoration: "none",
        padding: "20px 30px"
    },
    menuItemContainer: {
        alignItems: "center"
    },
    menuItemText: {
        fontSize: "18px",
        fontFamily: "branding-medium",
        color: "#373737",
        padding: "0px",
        margin: "0px",
        verticalAlign: "center"
    },
    mainContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px"
    },
    submit: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        marginLeft: "10px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
    },
    createAccount: {
        fontFamily: "branding-medium",
        fontSize: "18px",
        color: "#373737",
        marginLeft: "5px",
        textDecoration: "none"
    }
}));

function CustomMenu() {

    const [anchorEl, setAchorEl] = useState(false)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false)

    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    function handleProfileMenuOpen(event) {
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
            dispatch({ type: 'LOGOUT' })
        }
        else history.push("/signIn");
    }

    function handleSignUpClick() {
        history.push("/signUp");
    }

    function toPage(pagePath) {
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
                <ListItem className={classes.menuListItem} button onClick={() => history.push("/")} key="Menu">
                    <ListItemIcon><img src={HomeIcon} /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem className={classes.menuListItem} button onClick={() => history.push("/")} key="Menu">
                    <ListItemIcon><img src={ClassIcon} /></ListItemIcon>
                    <ListItemText primary="Cursos" />
                </ListItem>
                <ListItem className={classes.menuListItem} button onClick={() => history.push("/ranking")} key="Menu">
                    <ListItemIcon><img src={RankIcon} /></ListItemIcon>
                    <ListItemText primary="Rank" />
                </ListItem>
                <ListItem className={classes.menuListItem} button onClick={() => history.push("/")} key="Menu">
                    <ListItemIcon><img src={ForumIcon} /></ListItemIcon>
                    <ListItemText primary="Forúm" />
                </ListItem>
            </List>
            <Divider />
        </SwipeableDrawer>
    );

    return (
        <div className={classes.grow}>
            <AppBar elevation={0} className={classes.appBar} position="relative">
                <Toolbar>
                    <Grid container className={classes.mainContainer}>
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
                            <a className={classes.menuItem} href="/">
                                <Grid container spacing={1} className={classes.menuItemContainer}>
                                    <Grid item>
                                        <img src={HomeIcon} />
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.menuItemText}>Home</p>
                                    </Grid>

                                </Grid>
                            </a>
                            <a className={classes.menuItem} href="/">
                                <Grid container spacing={1} className={classes.menuItemContainer}>
                                    <Grid item>
                                        <img src={ClassIcon} />
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.menuItemText}>Cursos</p>
                                    </Grid>

                                </Grid>
                            </a>
                            <a className={classes.menuItem} href="/ranking">
                                <Grid container spacing={1} className={classes.menuItemContainer}>
                                    <Grid item>
                                        <img src={RankIcon} />
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.menuItemText}>Rank</p>
                                    </Grid>

                                </Grid>
                            </a>
                            <a className={classes.menuItem} href="/">
                                <Grid container spacing={1} className={classes.menuItemContainer}>
                                    <Grid item>
                                        <img src={ForumIcon} />
                                    </Grid>
                                    <Grid item>
                                        <p className={classes.menuItemText}>Forúm</p>
                                    </Grid>

                                </Grid>
                            </a>
                        </Grid>
                        <Grid item className={classes.grow}>
                            {!isAuth &&
                                (
                                    <div>
                                        <button href="signIn" className={classes.submit}>Entrar</button>
                                        <a href="/signUp" className={classes.createAccount}>ou Criar conta</a>
                                    </div>
                                )
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            { renderMobileMenu}
        </div >
    );
}

export default withStyles(useStyles)(CustomMenu);
