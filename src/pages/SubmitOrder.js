import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CustomSelect from '../components/input/CustomSelect'
import FileInputMult from '../components/input/FileInputMult'
import CustomInput from '../components/input/CustomInput'
import { fileToBase64 } from '../services/Utils'
import api from '../services/Api'
import CustomTextAreaWithLabel from '../components/input/CustomTextAreaWithLabel'
import * as Yup from 'yup';
import { Form } from '@unform/web';
import history from '../history'
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
        alignContent: "flex-start",
        justifyContent: "center"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(4),
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
    buttonsContainer: {
        justifyContent: "center",
        margin: theme.spacing(4, 0, 2),
    },
    input: {
        paddingLeft: "10px",
        paddingRight: "10px",
        alignSelf: "center"

    },
    title: {
        fontFamily: "branding-semibold",
        fontSize: "36px"
    },
}));

export default function SubmitOrder() {

    const classes = useStyles()
    const formRef = useRef(null);
    const [type, setType] = useState(null)


    const orderTypes = [
        { name: "Solicitar Medalha 3 mil", value: "MEDAL_3_REVENUES" },
        { name: "Solicitar Medalha 5 mil", value: "MEDAL_5_REVENUES" },
        { name: "Solicitar Medalha 10 mil", value: "MEDAL_10_REVENUES" },
        { name: "Solicitar Medalha 20 mil", value: "MEDAL_20_REVENUES" },
        { name: "Solicitar Medalha 30 mil", value: "MEDAL_30_REVENUES" },
        { name: "Solicitar Medalha Primeiro Parceiro", value: "MEDAL_FIRST_PARTNER" },
        { name: "Solicitar Medalha Primeiro Contrato", value: "MEDAL_FIRST_CONTRACT" },
        { name: "Solicitar Medalha Primeiro Feedback em video", value: "MEDAL_FIRST_VIDEO_FEEDBACK" },
        { name: "Solicitar Registro de novo cliente", value: "REGISTRY_NEW_CLIENT" },
        { name: "Solicitar Atualização de faturamento mensal", value: "UPDATE_MONTHLY_INVOICING" },

    ]

    async function handleSubmit(data) {

        try {

            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                "tipo da solicitação": Yup.string().required(),
                arquivos: Yup.string().required(),
                descrição: Yup.string().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const filesBase64 = await Promise.all(
                Array.from(data.arquivos).map(async file => {
                    return await fileToBase64(file)
                }))

            const request = {
                type: data["tipo da solicitação"],
                description: data.descrição,
                files: filesBase64,
                customFields: {
                    monthlyInvoicing: data.faturamento
                }
            }

            await api.post("users/orders", request)

            history.push("/orders")
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }

    function handleTypeChange(){
        setType(formRef.current.getFieldValue('tipo da solicitação'))
    }

    return (
        <React.Fragment>
            <div className={classes.main}>
                <Grid container className={classes.mainContainer} md={4}>
                    <Grid item>
                        <h1 className={classes.title}>Abrir Solicitação</h1>
                    </Grid>
                    <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item className={classes.input} xs={12} sm={12}>
                                <CustomSelect
                                    name="tipo da solicitação"
                                    label="Tipo da solicitação*"
                                    options={orderTypes}
                                    onChange={() => handleTypeChange()}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomTextAreaWithLabel label="Descrição" name="descrição" placeholder="Digite aqui..." rows="5" />
                            </Grid>
                            {type === "UPDATE_MONTHLY_INVOICING" && <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="faturamento"
                                    label="Faturamento Mensal*"
                                />
                            </Grid>
                            }
                            <Grid item className={classes.input} xs={12}>
                                <FileInputMult name="arquivos" label="Insira abaixo todos os documentos que comprovem a solicitação escolhida" />
                            </Grid>
                        </Grid>
                        <Grid container item className={classes.buttonsContainer}>
                            <Grid item>
                                <button
                                    type="submit"
                                    className={classes.submit}
                                >
                                    Submeter
                                </button>
                            </Grid>
                        </Grid>
                    </Form>

                </Grid>
            </div>
        </React.Fragment>
    );
}