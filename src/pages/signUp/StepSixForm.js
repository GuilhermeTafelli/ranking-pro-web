import React, { useRef, useState } from 'react'
import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../../components/input/CustomInput'
import * as Yup from 'yup';
import api from '../../services/Api'
import { setUser, login } from '../../services/Auth'
import CircularProgress from '@material-ui/core/CircularProgress'
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
    },
    
}));

export default function StepSixForm(props) {

    const { handleAlertOpen } = props

    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)
    const [submitLoading, setSubmitLoading] = useState(false);

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

            const requestSocialMedia = {
                instagram: state.instagram ? "https://instagram.com/" + state.instagram : null,
                facebook: state.facebook ? "https://facebook.com/" + state.facebook : null,
                youtube: state.youtube ? "https://youtube.com/user/" + state.youtube : null,
                linkedin: state.linkedin ? "https://linkedin.com/in/" + state.linkedin : null,
                twitter: state.twitter ? "https://twitter.com/" + state.twitter : null,
                tiktok: state.tiktok ? "https://tiktok.com/" + state.tiktok : null,
                aboutMe: state.aboutMe,
                skills: state.skills.values,
                niches: state.niches.values,
                whereYouFrom: state.whereYouFrom,
                user: request
            }

            const responseSocialMedia = await api.post("/users/socials-media", requestSocialMedia)

            login(responseSocialMedia.data.token);
            await dispatch({ type: 'LOGIN' })

            setUser(responseSocialMedia.data.user)
            history.push("/")

        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
            if (err.response) {
               handleAlertOpen("Falha no cadastro! Favor entrar em contato com o suporte.")
            }
        }
        setSubmitLoading(false)
    }


    return (

        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <h2 className={classes.title}>Para finalizarmos, defina sua senha</h2>
                </Grid>
                <Grid item className={classes.input} xs={12}>
                    <CustomInput
                        type="password"
                        name="senha"
                        label="Senha"
                        autoComplete="password"
                    />
                </Grid>
                <Grid item className={classes.input}>
                    <p className={classes.terms}>
                        Ao clicar em Cadastre, você concorda com nossos <a href="/terms" className={classes.termsButton}>Termos de Uso</a> e <a href="/privacy" className={classes.termsButton}>Política de Dados</a>. Você poderá receber notificações por SMS, E-mail e WhatsApp e cancelar isso quando quiser.
                    </p>
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