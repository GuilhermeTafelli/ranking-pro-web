import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CustomVerticalMenu from "../../components/customMenu/CustomVerticalMenu";
import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../../services/Api'
import history from '../../history'
import { useParams } from 'react-router-dom';
import AnswerOrderModal from './AnswerOrderModal'
const useStyles = makeStyles((theme) => ({
    content: {
        height: "100vh",
        background: "#F5F6FA",
        padding: "60px"
    },
    mainTitle: {
        fontSize: "35px",
        fontFamily: "branding-bold",
        paddingBottom: "20px",
    },
    mainContainer: {
        margin: "25px 0",
        fontSize: "17px",
        width: "100%",
        fontFamily: "branding-bold",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        padding: "10px"
    },
    title: {
        fontSize: "23px",
        fontFamily: "branding-semibold",
    },
    subTitle: {
        fontSize: "18px",
        fontFamily: "branding-semibold",
    },
    item: {
        padding: "10px"
    },
    value: {
        fontSize: "18px",
        fontFamily: "branding-medium",
    },
    status: {
        fontSize: "18px",
        fontFamily: "branding-bold",
    },
    containerItem: {
        padding: "10px"
    },
    containerButton: {
        padding: "30px",
        justifyContent: "flex-end"
    },
    file: {
        fontFamily: "branding-semibold",
        fontSize: "20px",
        color: "#FFF",
        background: "#a0a0a0",
        borderRadius: "10px",
        border: "none",
        padding: "10px 26px",
        marginLeft: "10px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none"
    },
    answer: {
        fontFamily: "branding-semibold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "10px",
        border: "none",
        padding: "10px 26px",
        marginLeft: "10px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
    }
}))

export default function Order() {

    const classes = useStyles()

    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { orderId } = useParams();
    const [openModal, setOpenModal] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/orders/" + orderId)
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data)
        await setLoading(false)
    }, []);

    function formatId(id) {
        var newId = "ID-" + "0".repeat(5 - id.length) + id
        return newId
    }

    function statusColor(status) {
        if(status === "OPEN") return "#3052DE"
        if (status === "CLOSED") return "#ff0000"
        if (status === "DONE") return "#00D656"
    }

    function formatStatus(status) {
        if (status === "OPEN") return "Aberta"
        if (status === "CLOSED") return "Fechada"
        if (status === "DONE") return "Concluída"
    }

    function handleClickAnswer(){
        setOpenModal(true)
    }

    function handleCloseAnswer(){
        setOpenModal(false)
        history.push("/admin/orders/"+orderId)

    }

    return (
        <Grid container className={classes.main} xs={12}>
            <CustomVerticalMenu />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <AnswerOrderModal open={openModal} handleClose={handleCloseAnswer} order={content}/>
            {content && <Grid conatiner item className={classes.content} xs={10}>
                <Grid item xs={12}>
                    <h1 className={classes.mainTitle}>Solicitação</h1>
                </Grid>
                <Grid container item className={classes.mainContainer}>
                    <Grid container className={classes.containerItem}>
                        <Grid item xs={12}>
                            <h2 className={classes.title}>Dados da Solicitação:</h2>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h3 className={classes.subTitle}>Identificação:</h3>
                            <p className={classes.value}>{formatId(String(content.id))}</p>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h2 className={classes.subTitle}>Tipo da solicitação:</h2>
                            <p className={classes.value}>{content.type}</p>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h2 className={classes.subTitle}>Status:</h2>
                            <p className={classes.status} style={{ color: statusColor(content.status) }}>{formatStatus(content.status)}</p>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h2 className={classes.subTitle}>Data de criação:</h2>
                            <p className={classes.value}>{content.createdAt}</p>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.containerItem}>
                        <Grid item xs={12}>
                            <h2 className={classes.title}>Dados do Usúario:</h2>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h3 className={classes.subTitle}>Nome:</h3>
                            <p className={classes.value}>{content.fullName}</p>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h2 className={classes.subTitle}>E-mail:</h2>
                            <p className={classes.value}>{content.email}</p>
                        </Grid>
                        <Grid container item className={classes.item} xs={4}>
                            <h2 className={classes.subTitle}>CPF:</h2>
                            <p className={classes.value}>{content.cpf}</p>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.containerItem}>
                        <Grid item xs={12}>
                            <h2 className={classes.title}>Arquivos:</h2>
                        </Grid>
                        <Grid container item className={classes.item}>
                            {content.filesLink && content.filesLink.map((link, index) =>
                                <a href={link} rel="external" target="_blank" className={classes.file}>{"Arquivo " + (index + 1)}</a>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.containerButton}>
                        <Grid>
                            <button onClick={handleClickAnswer} className={classes.answer}>Responder</button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            }
        </Grid>
    )
}