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
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "10px"
    },
  },
  conatainerItem: {
      padding: "20px"
  },
  containerProfilePhoto: {
      justifyContent: "center"
  }
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <div className={classes.main}>
            <Grid container md={10}>
                <Grid container item className={classes.containerItem}md={4}>
                    <Grid container item className={classes.containerProfilePhoto}>
                        <h2>Luiza Souza Santos</h2>
                        <h3>Social Media    </h3>
                    </Grid>
                </Grid>
            </Grid>
        </div>
     </React.Fragment>
  );
}