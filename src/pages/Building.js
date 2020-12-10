import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from 'react';
import CustomMenu from '../components/customMenu/CustomMenu'

const useStyles = makeStyles((theme) => ({
    main: {
        height: "100vh",
        background: "#F5F6FA",
        padding: "60px",
        justifyContent: "center",
    },
    title: {
        fontFamily: "branding-bold",
        fontSize: "100px",
        color: "#0B38F2",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            fontSize: "50px",
        },
    }
}))

export default function Home() {

    const classes = useStyles()

    return (
        <React.Fragment>
            <CustomMenu/>
            <Grid container className={classes.main} xs={12}>
                <Grid item>
                <h1 className={classes.title}>Em breve...</h1>

                </Grid>
            </Grid>
        </React.Fragment>
    )
}