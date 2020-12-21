import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../components/input/CustomInput'
import api from '../services/Api'
import * as Yup from 'yup';
import { Form } from '@unform/web';
import history from '../history'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../components/Alert'
import CustomMenu from '../components/customMenu/CustomMenu';
import CircularProgress from '@material-ui/core/CircularProgress'

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
    mainContainerSuccess: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
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
    newCode: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        margin: "20px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        cursor: "pointer"
    },
    myCodes: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        margin: "20px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none"
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
    sucessCongrats: {
        fontFamily: "branding-semibold",
        fontSize: "36px",
        textAlign: "center",
        color: "#373737"
    },
    sucessScore: {
        fontFamily: "branding-bold",
        fontSize: "62px",
        textAlign: "center"

    },
    sucessCode: {
        fontFamily: "branding-semibold",
        fontSize: "28px",
        color: "#373737",
        textAlign: "center"
    },
    score: {
        color: "#0B38F2"
    },
    successButtons: {
        marginTop: "250px",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            marginTop: "150px",

        },
    }
}));

export default function VerifyGamificationCode() {

    const initalAlert = {
        open: false,
        message: null
    }

    const classes = useStyles()
    const formRef = useRef(null);
    const [alert, setAlert] = useState(initalAlert);
    const [success, setSuccess] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleAlertClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setAlert({ ...alert, open: false })

    };

    const handleNewCode = () => {
        setSuccess(false)
    }

    const handleAlertOpen = (message) => {
        setAlert(
            {
                open: true,
                message: message
            }
        )
    }

    async function handleSubmit(data) {

        try {
            setSubmitLoading(true)

            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                senha: Yup.string().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });


            const request = {
                code: data.senha
            }

            const response = await api.post("/socials-media/gamification/code", request)
            setSuccess({ score: response.data.score, code: data.senha })



        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
            if (err.response) {
                if (err.response.data && err.response.data.code == "GAMIFICATION_CODE_NOT_FOUND") handleAlertOpen("Senha inválida!")
            }
            if (err.response) {
                if (err.response.data && err.response.data.code == "GAMIFICATION_CODE_ALREDY_REGISTERED") handleAlertOpen("Senha já registrada!")
            }
        }
        setSubmitLoading(false)
    }

    return (
        <React.Fragment>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={handleAlertClose} severity="error">
                    {alert.message}
                </Alert>
            </Snackbar>
            <CustomMenu />
            <div className={classes.main}>
                {!success && <Grid container className={classes.mainContainer} md={4}>
                    <Grid item>
                        <h1 className={classes.title}>Validar Senha!</h1>
                    </Grid>
                    <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item className={classes.input} xs={12} sm={12}>
                                <CustomInput
                                    name="senha"
                                    label="Senha"
                                />
                            </Grid>

                        </Grid>
                        <Grid container item className={classes.buttonsContainer}>
                            <Grid item>
                                <button
                                    type="submit"
                                    className={classes.submit}
                                >
                                    {!submitLoading && "Validar"}
                                    {submitLoading && <CircularProgress color="inherit" />}
                                </button>
                            </Grid>
                        </Grid>
                    </Form>
                </Grid>
                }
                {success &&
                    <Grid container className={classes.mainContainerSuccess} md={6}>
                        <Grid item >
                            <h2 className={classes.sucessCongrats}>Parabéns!!!</h2>

                        </Grid>
                        <Grid item>
                            <h1 className={classes.sucessScore}>Você ganhou <span className={classes.score}>{success.score}</span> pontos</h1>

                        </Grid>
                        <Grid item>
                            <   h2 className={classes.sucessCode}>Com a senha {success.code}</h2>
                        </Grid>
                        <Grid container item className={classes.successButtons}>
                            <Grid item >
                                <button
                                    type="submit"
                                    className={classes.newCode}
                                    onClick={handleNewCode}
                                >
                                    Nova senha
                                </button>
                            </Grid>
                            <Grid item>
                                <button
                                    type="submit"
                                    onClick={() => history.push("/new/gamification/code")}
                                    className={classes.myCodes}
                                >
                                    Minhas senhas
                                </button>
                            </Grid>
                        </Grid>

                    </Grid>
                }
            </div>
        </React.Fragment>
    );
}