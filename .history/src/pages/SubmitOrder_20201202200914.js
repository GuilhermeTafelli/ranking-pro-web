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
}));

export default function SubmitOrder() {
  const classes = useStyles();

    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);


  return (
    <React.Fragment>
        <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={8}>
                a
            </Grid> 
        </div>
    </React.Fragment>
  );
}