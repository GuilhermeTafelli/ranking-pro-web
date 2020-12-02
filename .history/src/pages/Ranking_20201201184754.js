import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from '@unform/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../services/Api'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { login, setUser } from '../services/Auth'
import history from '../history'
import { useDispatch } from 'react-redux'
import CustomInput from '../components/input/CustomInput'
import Alert from '../components/Alert'

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
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
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
        fontSize: "23px",
        fontFamily: "branding-bold",
        color: "#FFFFFF" ,
        textAlign: "center"
    },
    rankingItemRevenuesContainer: {
        background: "transparent linear-gradient(301deg, #16FF67 0%, #23CDD9 100%) 0% 0% no-repeat padding-box",
        padding: "2px 20px",
        borderRadius: "31px",
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
        maxHeight: "50vh",
        overflowY:"auto",
    

    },
    sectionDesktop: {
        display: "flex",
        [theme.breakpoints.down("xs")]: {
          display: "none"
        }
      },
      rankingList: {
        listStyleType: "none",
        
        "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)"
        },
        "*::-webkit-scrollbar-thumb": {
            backgroundColor: "darkgrey",
            outline: "1px solid slategrey"
          }
          
      }
}));

export default function Ranking() {
  const classes = useStyles();

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const dispatch = useDispatch()
  const items = ["1", "2", "3", "4", "5", "6", "7"]

  async function handleSubmit(data){
    console.log("teste")
    setSubmitLoading(true)
    
    try {
      const response = await api.post("/auth", data)
      
      await login(response.data.token);
      await setUser(response.data)
      await dispatch({ type: 'LOGIN'})
      await history.push("/");
    }
    catch(error){
      setOpenAlert(true) 
    };

    setSubmitLoading(false)
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false)
  };

  return (
    <React.Fragment>
        <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={8}>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Sua posição</h1>
                </Grid>
                <Grid container item className={classes.rankingItem} xs={12}>
                    <Grid item>
                        <Grid container>
                            <h2 className={classes.rankingPosition}>1</h2>
                            <Grid item className={classes.rankingItemNameContainer}>
                                <h3 className={classes.rankingItemName}>Sara</h3>
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
                                <h2 className={classes.rankingItemInfoText}>20</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Ranking</h1>
                </Grid>
                <Grid container className={classes.rankingListContainer}> 
                <ul className={classes.rankingList}>
                {items.map(item => (
                    <li>
                    <Grid container item className={classes.rankingItem} xs={12}>
                        <Grid item>
                            <Grid container>
                                <h2 className={classes.rankingPosition}>{item}</h2>
                                <Grid item className={classes.rankingItemNameContainer}>
                                    <h3 className={classes.rankingItemName}>Sara</h3>
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
                                    <h2 className={classes.rankingItemInfoText}>20</h2>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </li>
                ))}
                </ul>
                </Grid>

            </Grid> 
        </div>
    </React.Fragment>
  );
}