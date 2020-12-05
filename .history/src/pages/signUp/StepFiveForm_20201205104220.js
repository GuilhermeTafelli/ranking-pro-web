import React, {  useRef, useState } from 'react'
import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CustomInput from '../../components/input/CustomInput'
import * as Yup from 'yup';
import api from '../../services/Api'
import {setUser, login} from '../../services/Auth'
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
    buttonsContainer:{
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
    }
  }));

export default function StepFiveForm(){

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
                senha: Yup.string().required(),
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
            await dispatch({ type: 'LOGIN'})

            setUser(response.data.user)
            console.log(response)

            const requestSocialMedia = {
                userId: response.data.user.id,
                instagram: state.instagram,
                facebook: state.facebook,
                youtube: state.youtube,
                linkedin: state.linkedin,
                twitter: state.twitter,
                tiktok: state.tiktok,
                aboutMe: state.aboutMe,
                skills: state.skills,
                niches: state.niches
            }
      
            const responseSocialMedia = await api.post("/users/socials-media", requestSocialMedia)
            console.log(responseSocialMedia)
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
                    <h2 className={classes.title}>Para finalizarmos, defina sua senha</h2>
                </Grid>
                <Grid item className={classes.input} xs={12}>
                    <CustomInput 
                        type="password"
                        name="senha"
                        label="Senha"
                        autoComplete="password"
                        autoFocus
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