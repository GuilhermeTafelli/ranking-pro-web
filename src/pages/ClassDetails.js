
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import PinnedSubheaderList from '../components/PinnedSubheaderList'
import ResponsivePlayer from '../components/ResponsivePlayer'
import CustomAccordion from '../components/CustomAccordion'
import ReactPlayer from 'react-player'
const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent:"center",
        height: "100vh"
    },
    containerSecundary: {
        marginTop: theme.spacing(5),
        flexWrap: "wrap",
        justifyContent: "center",
        spacing: 10,
        alignItems: "stretch"
    },
    reactPlayer: {
        position: "absolute",
        top: 1,
        left: 0
    },
    playerWrapper: {
        position: "relative",
        paddingTop: "56.25%"
    }
    }));

export default function ClassDetails() {
    const classes = useStyles();


    return (
        <React.Fragment>
            <Grid container className={classes.container}>
                <Grid container className={classes.containerSecundary} spacing={3} lg={8} sm={12} xs={12}>
                    <Grid item lg={8} sm={12} xs={12}>
                        <div className={classes.playerWrapper}>                    
                            <ReactPlayer
                                className={classes.reactPlayer}
                                controls
                                width='100%'
                                height='100%'
                                url='https://www.youtube.com/watch?v=hhZ6yFvCWho'
                            />  
                        </div>  
                    </Grid>
                    
                    <Grid item lg={4} sm={12} xs={12}>
                        <PinnedSubheaderList/>
                    </Grid>
                </Grid> 
            </Grid>
            
        </React.Fragment>
    )
}
