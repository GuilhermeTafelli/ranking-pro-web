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
    orderItem: {
        padding: "20px 20px",
        [theme.breakpoints.down("xs")]: {
            paddingRight: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
        },
        backgroundColor: "#FFF",
        margin: "10px 0px",
        borderRadius: "30px",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.09)",
        cursor: "pointer"
    },
    text: {
        fontFamily: "branding-medium",
        fontSize: "16px"
    },
    status: {
        fontFamily: "branding-bold",
        fontSize: "16px",
    },

}));

export default function Ranking() {
    const classes = useStyles();

    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(async () => {
        setLoading(true)
        // const response = await api.get("/socials-media/ranking")
        // await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent("response.data.socialsMedia")
        await setLoading(false)
    }, []);

    function handleClickItem(item) {
        console.log(item)
        history.push("/socials-media/" + item.id)
    }

    function formatId(id){
        var newId = "ID-"+"0".repeat(5-id.length)+id
        return newId
    }

    function statusColor(status){
        if(status === "OPEN") return "#3052DE"
        if(status === "CLOSED") return "#ff0000"
        if(status === "DONE") return "#00D656"

    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomMenu />
            {content && <div className={classes.main}>
                <Grid container className={classes.mainContainer} md={8}>
                    <Grid item xs={12}>
                        <h1 className={classes.title}>Solicitações</h1>
                    </Grid>
                    <Grid container item className={classes.orderItem} xs={12}>
                        <Grid item>
                     <p className={classes.text}>{formatId("1")}</p>
                        </Grid>
                        <p className={classes.text}>Medalha de faturamento 3 mil</p>
                        <p className={classes.status} style={{ color: statusColor("CLOSED") }}>Aberto</p>

                    </Grid>
                </Grid>
            </div>
            }
        </React.Fragment>
    );
}