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
    },
    title: {
        fontSize: "35px",
        fontFamily: "branding-bold",
        paddingBottom: "20px",
    },
    table: {
        borderCollapse: "collapse",
        margin: "25px 0",
        fontSize: "17px",
        width: "100%",
        fontFamily: "branding-bold",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",

    },
    tableHead: {
        backgroundColor: "#009879",
        color: "#ffffff",
        textAlign: "left",
    },
    tableHeadTitleFirst: {
        borderRadius: "10px 0px 0px 0px",
        padding: "12px 15px",
    },
    tableHeadTitleLast: {
        borderRadius: "0px 10px 0px 0px",
        padding: "12px 15px"
    },
    tableHeadTitle: {
        padding: "12px 15px"
    },
    tableItem: {
        borderBottom: "1px solid #dddddd",
        cursor: "pointer",
        "&:hover":{
            background: "#e0e0e0"
        }
    },
    tableItemColumn: {
        padding: "12px 15px",
        fontFamily: "branding-medium",
        fontSize: "15px"
    },
    tableItemColumnStatus: {
        padding: "12px 15px",
        fontFamily: "branding-bold",
        fontSize: "15px"
    }

}))

export default function Orders() {

    const classes = useStyles()

    const [content, setContent] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/orders")
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data)
        await setLoading(false)
    }, []);

    function handleClickItem(item) {
        console.log(item)
        history.push("/admin/orders/"+item)
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
        <Grid container className={classes.main} xs={12}>
            <CustomVerticalMenu />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {content && <Grid conatiner item className={classes.content} xs={10}>
                <Grid item xs={12}>
                    <h1 className={classes.title}>Solicitações</h1>
                </Grid>
                <Grid item xs={12}>
                    <table className={classes.table}>
                        <tr className={classes.tableHead}>
                            <th className={classes.tableHeadTitleFirst}>ID</th>
                            <th className={classes.tableHeadTitle}>Data de criação</th>
                            <th className={classes.tableHeadTitle}>CPF</th>
                            <th className={classes.tableHeadTitle}>Nome</th>
                            <th className={classes.tableHeadTitle}>Tipo de solicitação</th>
                            <th className={classes.tableHeadTitleLast}>Status</th>
                        </tr>
                        {content && content.map(item => (<tr onClick={() => handleClickItem(item.id)} className={classes.tableItem}>
                            <td className={classes.tableItemColumn}>{formatId(String(item.id))}</td>
                            <td className={classes.tableItemColumn}>{item.createdAt}</td>
                            <td className={classes.tableItemColumn}>{item.cpf}</td>
                            <td className={classes.tableItemColumn}>{item.fullName}</td>
                            <td className={classes.tableItemColumn}>{item.type}</td>
                            <td className={classes.tableItemColumnStatus} style={{color: statusColor(item.status)}}>{formatStatus(item.status)}</td>
                        </tr>))}
                    </table>
                </Grid>
            </Grid>
    }
        </Grid>
    )
}