import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import { useDispatch } from 'react-redux'

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
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
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
        padding: "2px 20px",
        borderRadius: "31px",
        justifyContent: "center",
        flexGrow: 2
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
        justifyContent: "flex-end"
    },
    rankingList: {
    listStyleType: "none",       
    width: "100%"   
    },
    itemInfos: {
        flexGrow: 1,
    },
    profilePhoto: {
        height: "45px",
        width: "65px",
        borderRadius: "57px"
    }
}));

export default function Ranking(props) {
  const classes = useStyles();

  const [content, setContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    setLoading(true)
    const response =  await api.get("/socials-media/ranking")
    await new Promise((resolve) => setTimeout(resolve, 500))
    await setContent(response.data.socialsMedia)
    // console.log("enters")
    await setLoading(false)
}, []);


  return (
    <React.Fragment>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        {content && <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={8}>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Sua posição</h1>
                </Grid>
                <Grid container item className={classes.rankingItem} xs={12}>
                    <Grid item>
                        <Grid container>
                            <h2 className={classes.rankingPosition}>1</h2>
                            <Grid item className={classes.rankingItemNameContainer}>
                                <h3 className={classes.rankingItemName}>Sara Gimenes</h3>
                                <h4 className={classes.rankingItemLocation}>Uberlândia</h4>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.rankingItemRevenuesContainer}>
                        <h4 className={classes.rankingItemTitle}>Faturamento</h4>
                        <h2 className={classes.rankingItemRevenuesText}>R$ 35.000,00</h2>
                    </Grid>
                    <Grid item className={classes.sectionDesktop}>
                        <Grid container>
                            <Grid item className={classes.infosContainer}>
                                <h4 className={classes.rankingItemInfoTitle}>Clientes Ativos</h4>
                                <h2 className={classes.rankingItemInfoText}>1</h2>
                            </Grid>
                            <Grid item className={classes.infosContainer}>
                                <h4 className={classes.rankingItemInfoTitle}>Trabalhos Feitos</h4>
                                <h2 className={classes.rankingItemInfoText}>5</h2>
                            </Grid>
                            <Grid item className={classes.infosContainer}>
                                <h4 className={classes.rankingItemInfoTitle}>Medalhas</h4>
                                <h2 className={classes.rankingItemInfoText}>1</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Ranking</h1>
                </Grid>
                <Grid item container className={classes.rankingListContainer} xs={12}> 
                
                    <Grid item xs={12}><ul className={classes.rankingList} xs={12}>
                {content.map((item, index) =>
                    <li>
                    <Grid container item className={classes.rankingItem}>
                        <Grid container item className={classes.itemInfos} xs={4} md={4}>
                            <Grid container>
                               <h2 className={classes.rankingPosition}>{index+1}</h2>
                               <img className={classes.profilePhoto} src={item.profilePhotoLink}/>
                                <Grid item className={classes.rankingItemNameContainer}>
                                    <h3 className={classes.rankingItemName}>{item.fullName}</h3>
                                    <h4 className={classes.rankingItemLocation}>{item.city ? item.city : "-"}</h4>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item className={classes.rankingItemRevenuesContainer} xs={8} md={4}>
                            <Grid item>
                                    <h4 className={classes.rankingItemTitle}>Faturamento</h4>
                            <h2 className={classes.rankingItemRevenuesText}>{item.monthlyInvoicing ? "R$ "+item.monthlyInvoicing.toFixed(2) : "-"}</h2>

                            </Grid>
                        </Grid>
                        <Grid container item className={classes.sectionDesktop} xs={4}>
                            <Grid item>
                            <Grid container>
                                <Grid item className={classes.infosContainer}>
                                    <h4 className={classes.rankingItemInfoTitle}>Clientes Ativos</h4>
                                    <h2 className={classes.rankingItemInfoText}>{content.activeClients ? content.activeClients : "-"}</h2>
                                </Grid>
                                <Grid item className={classes.infosContainer}>
                                    <h4 className={classes.rankingItemInfoTitle}>Trabalhos Feitos</h4>
                                    <h2 className={classes.rankingItemInfoText}>{content.worksDone ? content.worksDone : "-"}</h2>
                                </Grid>
                                <Grid item className={classes.infosContainer}>
                                    <h4 className={classes.rankingItemInfoTitle}>Medalhas</h4>
                                    <h2 className={classes.rankingItemInfoText}>{content.medals ? content.medals : "-"}</h2>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </li>
                )}
                </ul>
                </Grid>
                </Grid>

            </Grid> 
        </div>
    }
    </React.Fragment>
  );
}