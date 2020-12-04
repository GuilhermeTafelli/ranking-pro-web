import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import history from '../history'
import CustomMenu from '../components/CustomMenu'
const useStyles = makeStyles((theme) => ({
    main: {
        background: "#F5F6FA",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "50px",
        [theme.breakpoints.down("sm")]: {
          padding: "10px"
        },
      },
    mainContainer: {
        alignContent: "flex-start"
    },
    line: {
        margin: "20px 10px",
        borderTop: "1px solid #e5e5e5",
        display: "inline-block"
    },
    title: {
        fontFamily: "branding-bold",
        fontSize: "18px"
    },
    rankingItem: {
        padding: "0px 20px",
        [theme.breakpoints.down("xs")]: {
            paddingRight: "0px",
        },
        backgroundColor: "#FFF",
        margin: "10px 0px",
        borderRadius: "30px",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.09)",
        cursor: "pointer"
    },
    rankingPosition: {
        fontSize: "28px",
        fontFamily: "branding-medium",
        color: "#3052DE"
    },
    rankingItemPhoto: {
        borderRadius: "57px"
    },
    rankingItemName:{
        fontSize: "18px",
        fontFamily: "branding-medium",
        color: "#373737"
    },
    rankingItemNameContainer: {
        margin: "0px 20px",
        alignSelf: "flex-start"
    },
    rankingItemLocation: {
        fontSize: "13px",
        fontFamily: "branding-light",
        color: "#373737" 
    },
    rankingItemTitle: {
        fontSize: "13px",
        fontFamily: "branding-medium",
        color: "#FFFFFF",
        textAlign: "center"
    },
    rankingItemRevenuesText: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
        },
        fontSize: "40px",
        fontFamily: "branding-bold",
        color: "#FFFFFF" ,
        textAlign: "center"
    },
    rankingItemRevenuesContainer: {
        background: "transparent linear-gradient(301deg, #16FF67 0%, #23CDD9 100%) 0% 0% no-repeat padding-box",
        [theme.breakpoints.down("xs")]: {
            padding: "2px 10px",
        },
        padding: "2px 20px",
        borderRadius: "31px",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            flexGrow: 1, 
        },
    },
    infosContainer:{
        margin: "0px 10px",
    },
    rankingItemInfoTitle: {
        fontSize: "8px",
        fontFamily: "branding-medium",
        color: "#373737",
        textAlign: "center"
    },
    rankingItemInfoText: {
        fontSize: "30px",
        fontFamily: "branding-bold",
        color: "#373737",
        textAlign: "center"
    },
    rankingListContainer:{
        background: "#FFF",
        padding: "5px 20px",
        borderRadius: "30px",
        margin: "20px 0px",
        overflowY:"auto",
    },
    sectionDesktop: {
        [theme.breakpoints.down("xs")]: {
          display: "none"
        },
        flexGrow: 1,
        width: "20%"
    },
    rankingList: {
        listStyleType: "none",       
        width: "100%"   
    },
    itemInfos: {
        flexGrow: 1,
        width: "20%"

    },
    sectionDesktopContainer:{
        justifyContent: "flex-end",
    },
    profilePhoto: {
        height: "45px",
        width: "65px",
        borderRadius: "57px",
        marginLeft: "20px",
        marginBottom: "0px",
        [theme.breakpoints.down("xs")]: {
            display: "none"
          },
    },
    itemInfosContainer: {
        alignItems: "center"
    },
    item: {
        padding: "0px",
        margin: "0px"
      }
}));

export default function Ranking() {
  const classes = useStyles();

    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(async () => {
        setLoading(true)
        const response =  await api.get("/socials-media/ranking")
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data.socialsMedia)
        await setLoading(false)
    }, []);

    function handleClickItem(item){
        console.log(item)
        history.push("/socials-media/"+item.id)
    }

  return (
    <React.Fragment>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <CustomMenu/>
        {content && <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={8}>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Sua posição</h1>
                </Grid>
                <Grid container item className={classes.rankingItem} xs={12}>
                    a
                </Grid>
            </Grid> 
        </div>
    }
    </React.Fragment>
  );
}