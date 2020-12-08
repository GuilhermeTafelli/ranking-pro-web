import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getUser, logout } from '../../services/Auth'
import history from '../../history'
import { useSelector, useDispatch } from 'react-redux'
import HomeIcon from '../../static/home.svg'
import RankIcon from '../../static/rank.svg'
import ClassIcon from '../../static/class.svg'
import ForumIcon from '../../static/forum.svg'

import './style.css'


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
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
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
        padding: "20px 30px",
        [theme.breakpoints.down("sm")]: {
            padding: "20px 15px",
        }
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
        padding: "2px 80px",
        [theme.breakpoints.down("md")]: {
            padding: "5px 20px",
        },
        [theme.breakpoints.down("sm")]: {
            padding: "5px 10px",
        },
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
    submitMobile: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
    },
    createAccount: {
        fontFamily: "branding-medium",
        fontSize: "18px",
        color: "#373737",
        marginLeft: "5px",
        textDecoration: "none"
    },
    profilePhoto: {
        height: "60px",
        width: "60px",
        borderRadius: "21px",
    },
    containerAuthMobile: {
        padding: "20px"
    }
}));

export default function CustomMenu() {

    const [anchorEl, setAchorEl] = useState(false)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false)

    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const user = getUser()
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
            <Grid className={classes.containerAuthMobile}>
                {!isAuth &&
                    (
                        <div>
                            <button onClick={() => history.push("/signIn")} className={classes.submitMobile}>Entrar</button>
                            <a href="/signUp" className={classes.createAccount}>ou Criar conta</a>
                        </div>
                    )
                }
            </Grid>

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
        <div>
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

                        {!isAuth &&
                            <Grid item className={classes.sectionDesktop}>
                                <div>
                                    <button onClick={() => history.push("/signIn")} className={classes.submit}>Entrar</button>
                                    <a href="/signUp" className={classes.createAccount}>ou Criar conta</a>
                                </div>
                            </Grid>
                        }
                        {isAuth &&
                            <div className="dropdown" style={{ float: "right" }}>

                                <div className="dropbtn">
                                    <img className={classes.profilePhoto} src={user.profilePhotoLink} />
                                </div>
                                <div className="dropDownContent">
                                    <a>Perfil</a>
                                    <a href="/orders">Solicitações</a>
                                    <a onClick={handleSessionClick}>Sair</a>
                                </div>
                            </div>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
            { renderMobileMenu}
        </div >
    );
}

