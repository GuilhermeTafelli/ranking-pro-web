import { Grid } from "@material-ui/core";
import CustomSelect from '../../components/input/CustomSelect'
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from 'react'
import { Form } from '@unform/web';
import CustomTextAreaWithLabel from "../../components/input/CustomTextAreaWithLabel";
import CircularProgress from '@material-ui/core/CircularProgress'
import api from '../../services/Api'
import history from '../../history'
const useStyles = makeStyles((theme) => ({
    main: {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        background: "rgba(0,0,0,0.8)",
        Zindex: "99999",
        opacity: "1"
    },
    modal: {
        width: "50%",
        position: "relative",
        margin: "10% auto",
        padding: "30px",
        background: "#F5F6FA",
        borderRadius: "15px"
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
    buttonContainer: {
        marginTop: "20px",
        justifyContent: "center"
    },
    close: {
        fontFamily: "branding-semibold",
        fontSize: "20px",
        color: "#FFF",
        background: "#a0a0a0",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        marginLeft: "10px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none"
    },

}))

export default function AnswerOrderModal(props) {

    const { open, order, handleClose } = props
    const formRef = useRef(null);
    const classes = useStyles()
    const [submitLoading, setSubmitLoading] = useState(false);

    async function handleSubmit(data) {
        setSubmitLoading(true)

        const request = {
            status: data.status,
            message: data.mensagem
        }

        const response = await api.post("/orders/"+order.id+"/answer", request)

        setSubmitLoading(false)
        handleClose()

    }


    return (
        <>
            {open &&
                <div className={classes.main}>
                    <div className={classes.modal}>
                        <h1>Responder</h1>
                        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
                            <Grid item xs={4}>
                                <CustomSelect
                                    name="status"
                                    label="Status*"
                                    options={[{ name: "Fechada", value: "CLOSED" }, { name: "Aberta", value: "OPEN" }, { name: "Concluída", value: "DONE" }]}
                                    defaultValue={order.status}
                                />
                            </Grid>
                            <Grid item>
                                <CustomTextAreaWithLabel
                                    name="mensagem"
                                    label="Mensagem*"
                                    defaultValue={order.message}
                                />
                            </Grid>
                            <Grid container item className={classes.buttonContainer}>
                                <button
                                    type="submit"
                                    className={classes.submit}
                                >
                                    {!submitLoading && "Responder"}
                                    {submitLoading && <CircularProgress color="inherit" />}
                                </button>
                                <button
                                    onClick={() => handleClose()}
                                    className={classes.close}
                                >
                                    Fechar
                                </button>
                            </Grid>
                        </Form>
                    </div>
                </div >
            }
        </>

    )
}