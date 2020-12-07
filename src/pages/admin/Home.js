import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CustomVerticalMenu from "../../components/customMenu/CustomVerticalMenu";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../../services/Api'
import history from '../../history'

const useStyles = makeStyles((theme) => ({
    content: {
        height: "100vh",
        background: "#F5F6FA",
        padding: "60px"
    }
}))

export default function Home() {

    const classes = useStyles()

       return (
        <Grid container className={classes.main} xs={12}>
            <CustomVerticalMenu />
        </Grid>
    )
}