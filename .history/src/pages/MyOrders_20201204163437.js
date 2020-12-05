import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import history from '../history'
import CustomMenu from '../components/customMenu/CustomMenu'
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
        fontSize: "24px",
        verticalAlign: "center"
    },
    orderItem: {
        padding: "20px 20px",
        [theme.breakpoints.down("xs")]: {
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
    textType: {
        fontFamily: "branding-medium",
        fontSize: "16px",
        textAlign: "center"
    },
    status: {
        fontFamily: "branding-bold",
        fontSize: "16px",
        textAlign: "right"
    },
    submit: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        marginLeft: "10px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)"
    },
}));

export default function Ranking() {
    const classes = useStyles();

    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/orders")
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data)
        await setLoading(false)
    }, []);

    function handleClickItem(item) {
        console.log(item)
        history.push("/socials-media/" + item.id)
    }

    function formatId(id) {
        var newId = "ID-" + "0".repeat(5 - id.length) + id
        return newId
    }

    function statusColor(status) {
        if (status === "OPEN") return "#3052DE"
        if (status === "CLOSED") return "#ff0000"
        if (status === "DONE") return "#00D656"
    }

    function formatStatus(status) {
        if (status === "OPEN") return "Aberta"
        if (status === "CLOSED") return "Fechada"
        if (status === "DONE") return "Concluída"
    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomMenu />
            {content && <div className={classes.main}>
                <Grid container className={classes.mainContainer} md={8}>
                    <Grid container item xs={12}>
                        <Grid item>
                            <h1 className={classes.title}>Solicitações</h1>

                        </Grid>
                        <Grid item>
                                <button
                                    type="submit"
                                    className={classes.submit}
                                >
                                    Nova solicitação
                                </button>
                            </Grid>
                    </Grid>
                    {content.map(item => (
                        <Grid container item className={classes.orderItem} xs={12}>
                            <Grid item xs={3}>
                                <p className={classes.text}>{formatId(String(item.id))}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className={classes.textType} >{item.type}</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className={classes.status} style={{ color: statusColor(item.status) }}>{formatStatus(item.status)}</p>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
            }
        </React.Fragment>
    );
}