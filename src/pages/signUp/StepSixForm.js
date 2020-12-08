import React, { useRef, useState } from 'react'
import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup';
import api from '../../services/Api'
import { setUser, login } from '../../services/Auth'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckboxInput from '../../components/input/CheckboxInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import history from '../../history'
const useStyles = makeStyles((theme) => ({

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
        fontFamily: "branding-light",
        fontSize: "30px"
    },
    checkbox: {
        fontFamily: "branding-light",
        fontSize: "18px",
        color: "#373737"
    },
    subTitle: {
        margin: "30px 0px",
        fontFamily: "branding-semibold",
        fontSize: "38px",
    },
    terms: {
        fontFamily: "branding-medium",
        color: "#C1C1C1",
        textAlign: "justify"
    },
    termsButton: {
        fontFamily: "branding-medium",
        color: "#244CF4",
        textAlign: "justify",
        textDecoration: "none"
    }
}));

export default function StepFiveForm() {

    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)
    const [submitLoading, setSubmitLoading] = useState(false);
    const [checkedNewHere, setCheckedNewHere] = useState(false);
    const [checked12K, setChecked12K] = useState(false);
    const [checked3Ls, setChecked3Ls] = useState(false);
    async function handleSubmit(data) {

        try {

            setSubmitLoading(true)
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                senha: Yup.string().required().matches(
                    /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}))/,
                    "Deve conter no minimo 8 caracteres, sendo no minimo uma letra maiuscula, uma letra miniscula e um número"
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });


            const request = {
                fullName: state.name,
                birthDate: state.bday,
                sex: state.sex,
                cpf: state.cpf,
                email: state.email,
                address: state.address,
                addressNumber: state.number,
                addressComplement: state.complement,
                city: state.city,
                state: state.addressState,
                country: state.country,
                postalCode: state.postalCode,
                whatsApp: state.whatsApp,
                profilePhoto: { base64: state.photo },
                password: data.senha
            }


            const response = await api.post("/users", request)

            login(response.data.token);
            await dispatch({ type: 'LOGIN' })

            setUser(response.data.user)

            const requestSocialMedia = {
                userId: response.data.user.id,
                instagram: state.instagram ? "instagram.com/" + state.instagram : null,
                facebook: state.facebook ? "facebook.com/" + state.facebook : null,
                youtube: state.youtube ? "youtube.com/user/" + state.youtube : null,
                linkedin: state.linkedin ? "linkedin.com/in/" + state.linkedin : null,
                twitter: state.twitter ? "twitter.com/" + state.twitter : null,
                tiktok: state.tiktok ? "tiktok.com/" + state.tiktok : null,
                aboutMe: state.aboutMe,
                skills: state.skills.values,
                niches: state.niches.values
            }

            const responseSocialMedia = await api.post("/users/socials-media", requestSocialMedia)
            history.push("/")

        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
        setSubmitLoading(false)
    }


    return (

        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <h2 className={classes.title}>Estamos quase acabando, mas antes gostaríamos de saber:</h2>
                    <h3 className={classes.subTitle}> Onde você nos conheceu ?</h3>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    className={classes.checkbox}
                        control={<CheckboxInput  color="primary" name="newHere" value={checkedNewHere} onChange={(event) => setCheckedNewHere(event.target.checked)} />}
                        label="Sou nova(o) por aqui."
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<CheckboxInput color="#244CF4" name="12KStudent" value={checked12K} onChange={(event) => setChecked12K(event.target.checked)} />}
                        label="Sou aluna(o) 12K"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<CheckboxInput color="#244CF4" name="3LsStudent" value={checked3Ls} onChange={(event) => setChecked3Ls(event.target.checked)} />}
                        label="Sou aluna(o) 3L's"
                    />
                </Grid>
            </Grid>
            <Grid container item className={classes.buttonsContainer}>
                <Grid item>
                    <button
                        type="submit"
                        className={classes.submit}
                    >
                        {!submitLoading && "Cadastrar"}
                        {submitLoading && <CircularProgress color="inherit" />}
                    </button>
                </Grid>
            </Grid>
        </Form>

    )
}