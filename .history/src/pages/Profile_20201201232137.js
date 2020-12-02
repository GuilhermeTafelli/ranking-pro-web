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
  profileContainer: {
      padding: "20px"
  },
  profileItem: {
      background: "#FFF",
      borderRadius: "30px"
  },
  containerProfilePhoto: {
      alignItems: "center"
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
  }
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <div className={classes.main}>
            <Grid container md={10}>
                <Grid item className={classes.profileContainer} md={4}>
                    <Grid container className={classes.profileItem}>
                    <Grid container item className={classes.containerProfilePhoto}>
                        <Grid item style={{background: "red"}}>
                            <img className={classes.profilePhoto} src="https://ranking-pro-files.s3.sa-east-1.amazonaws.com/profile-photo-undefined-18b98c0a1bfe4f15"></img>
                        </Grid>

                        <Grid item xs="12">
                        <h2 className={classes.name}>Luiza Souza Santos</h2>
                        </Grid>
                        <h3 className={classes.socialMedia}>Social Media    </h3>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
     </React.Fragment>
  );
}