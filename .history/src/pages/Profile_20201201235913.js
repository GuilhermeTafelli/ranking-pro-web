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
    alignItems: "flex-start",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "10px"
    },
  },
  mainContainer: {
    alignItems: "flex-start"
  },
  profileContainer: {
      padding: "20px",
  },
  profileItem: {
      background: "#FFF",
      borderRadius: "30px",
      margin: "5px"

  },
  containerProfilePhoto: {
      justifyContent: "center"
  },
  name: {
    fontSize: "32px",
    fontFamily: "branding-semibold",
    color: "#3156E1",
    textAlign: "center"
  },
  socialMedia: {
    fontSize: "26px",
    fontFamily: "branding-medium",
    color: "#373737",
    textAlign: "center" 
  },
  profilePhoto: {
      height: "180px",
      width: "180px",
      borderRadius: "30px"
  },
  aboutMe: {
    fontSize: "20px",
    fontFamily: "branding-medium",
    color: "#373737",
    textAlign: "justify" 
  },
  title: {
    fontSize: "22px",
    fontFamily: "branding-bold",
    color: "#373737",
  },
  cardItem: {
    padding: "5px"   
  },
  cardPosition: {
    background: "#FFF",
    borderRadius: "30px",
    padding: "10px 20px",   
  },
  cardPositionTitle: {
    fontSize: "13px",
    fontFamily: "branding-medium",
    color: "#272727",
    textAlign: "center" 
  },
  cardPositionValue: {
    fontSize: "60px",
    fontFamily: "branding-bold",
    color: "#3052DE",
    textAlign: "center" 
  },
  cardRevenues: {
    background: "transparent linear-gradient(290deg, #16FF67 0%, #23CDD9 100%) 0% 0% no-repeat padding-box",
    borderRadius: "30px",
    padding: "10px 20px",   
  },
  cardRevenuesTitle: {
    fontSize: "13px",
    fontFamily: "branding-bold",
    color: "#FFF",
  },
  cardRevenuesValue: {
    fontSize: "60px",
    fontFamily: "branding-bold",
    color: "#FFF",
  },
  cardClients: {
    background: "transparent linear-gradient(193deg, #348CFF 0%, #7930D8 100%) 0% 0% no-repeat padding-box",
    borderRadius: "30px",
    padding: "10px 20px",   
  },
  cardClientsTitle: {
    fontSize: "13px",
    fontFamily: "branding-medium",
    color: "#FFF",
    textAlign: "center" 
  },
  cardClientsValue: {
    fontSize: "60px",
    fontFamily: "branding-bold",
    color: "#FFFF",
    textAlign: "center" 
  },
  cardWorks: {
    background: "transparent linear-gradient(198deg, #484848 0%, #292828 100%) 0% 0% no-repeat padding-box",
    borderRadius: "30px",
    padding: "10px 20px"   
  },
  cardWorksTitle: {
    fontSize: "13px",
    fontFamily: "branding-medium",
    color: "#FFF",
    textAlign: "center" 
  },
  cardWorksValue: {
    fontSize: "60px",
    fontFamily: "branding-bold",
    color: "#FFFF",
    textAlign: "center" 
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={10}>
                <Grid item className={classes.profileContainer} md={3}>             
                    <Grid container className={classes.profileItem}>
                        <Grid container item className={classes.containerProfilePhoto}>
                            <Grid item style={{background: "red"}}>
                                <img className={classes.profilePhoto} src="https://ranking-pro-files.s3.sa-east-1.amazonaws.com/profile-photo-undefined-18b98c0a1bfe4f15"></img>
                            </Grid>
                            <Grid item xs={12}>
                                <h2 className={classes.name}>Luiza Souza Santos</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <h3 className={classes.socialMedia}>Social Media</h3>
                            </Grid>
                    
                        </Grid>
                        <Grid item xs={12}>
                            <p className={classes.aboutMe}>Meu noem é asidjaosdij asodijaosidjaosd aosidjaoisjdoasd iaosdjaosidjaoisdj aiosdjaosidjaoisdj aoisdjaosidjaoisdj aosidjaosidj</p>
                        </Grid>
                        <h3 className={classes.title}>Informações</h3>
                        <Grid container item>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>       
                            </Grid>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>
                            </Grid>
                        </Grid>
                        <h3 className={classes.title}>Redes Sociais</h3>
                        <Grid container item>
                            <Grid item xs={6    }>
                                <p>Uberlândia</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Uberlândia</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item className={classes.profileContainer} md={5}>
                    <Grid container className={classes.cardItem} xs={4}>
                        <Grid item className={classes.cardPosition} xs={12}>
                            <h3 className={classes.cardPositionTitle}>Posição</h3>
                            <h4 className={classes.cardPositionValue}>15</h4>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.cardItem} xs={4}>
                    <Grid item className={classes.cardClients} xs={12}>
                            <h3 className={classes.cardClientsTitle}>Clientes</h3>
                            <h4 className={classes.cardClientsValue}>15</h4>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.cardItem} xs={4}>
                        <Grid item className={classes.cardWorks} xs={12}>
                            <h3 className={classes.cardWorksTitle}>Trabalhos feitos </h3>
                            <h4 className={classes.cardWorksValue}>15</h4>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.profileItem}>
                        <Grid item xs={12}>
                            <h3 className={classes.title}>Medalhas</h3>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.cardItem} xs={12}>
                        <Grid item className={classes.cardRevenues} xs={12}>
                            <h3 className={classes.cardRevenuesTitle}>Faturamento</h3>
                            <h4 className={classes.cardRevenuesValue}>R$ 9.000,00</h4>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item className={classes.profileContainer} md={3}>
                    <Grid container className={classes.profileItem}>
                        a
                    </Grid>
                </Grid>
            </Grid>
        </div>
     </React.Fragment>
  );
}