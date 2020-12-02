import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from '@unform/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../services/Api'
import Snackbar from '@material-ui/core/Snackbar';
import { login, setUser } from '../services/Auth'
import history from '../history'
import { useDispatch } from 'react-redux'
import CustomInput from '../components/input/CustomInput'
import Alert from '../components/Alert'
import {ReactComponent as BackIcon} from '../static/back.svg'

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    createAccount: {
      backgroundColor: "#D4D4D4",
      borderRadius: "31px",
      border: "none",
      padding: "10px 26px",
      fontFamily: "branding-medium",
      color: "#858585",
      fontSize: "20px"
    },
    title: {
      fontFamily: "branding-semibold",
      fontSize: "36px"
  
    },
    main: {
      background: "#F5F6FA",
      height: "95vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "20px"
      },
    },
    buttonsContainer:{
      justifyContent: "flex-end",
      margin: theme.spacing(4, 0, 2),
    },
    forgotPassword: {
      textDecoration: "none",
      fontFamily: "branding-semibold",
      color: "#000",
      "&:hover":{
        textDecoration: "underline"
      }
    },
    forgotPasswordContainer: {
      justifyContent: "center",
      marginTop: "25px",
      fontSize: "16px"
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      height: "5vh",
      [theme.breakpoints.down("sm")]: {
        justifyContent:"center",
        marginRight: "0px",

      },
      marginRight: "20px",
      background: "#F5F6FA"
    },
    footerText: {
      textDecoration: "none",
      fontFamily: "branding-semibold",
      color: "#000",
      "&:hover":{
        textDecoration: "underline"
      },
      padding: "20px"
    },
    description: {
        fontFamily: "branding-light",
        fontSize: "20px",
        color: "#000000"
    },
    resetPassowordContent: {
        justifyContent: "center"
    },
    back: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#000000",
        marginLeft: "10px"
    },
    containerBack: {
        marginBottom: "30px",
        flexGrow: 1,
        background: "red"
    },
    blackLink: {
        textDecoration: "none",
        color: "#000",
        "&:hover":{
          textDecoration: "underline"
        }    
    },
    teste: {
      flexGrow: 1,
      background: "blue"
    },
    mainContainer: {
      flexGrow: 2,
      backgroundColor: "yellow"
    }
  }));

export default function ResetPassword() {

    const classes = useStyles()
    const [openAlert, setOpenAlert] = React.useState(false);
    const [submitLoading, setSubmitLoading] = React.useState(false);

    async function handleSubmit(data) {
    }
    
      const handleAlertClose = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }

        setOpenAlert(false)
      
      };

    return (
        <React.Fragment>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert onClose={handleAlertClose} severity="error">
              Usuário ou senha inválidos!
            </Alert>
        </Snackbar>
        <Grid container className={classes.main}>
            <Grid container className={classes.resetPassowordContent}>
                <Grid container item className={classes.containerBack} sm={1}>
                    <a className={classes.blackLink} href="/signIn" textDecoration="none" style={{display: "flex"}}>
                        <BackIcon display="flex"/>
                        <h5 className={classes.back}>Voltar</h5>
                    </a>
                </Grid>
                <Grid container item  className={classes.mainContainer} sm={8} lg={4}>
                    <div className={classes.paper}>
                        <h1 className={classes.title}>Esqueci minha senha</h1>
                        <Form className={classes.form} onSubmit={handleSubmit} >
                            <Grid container className={classes.formContainer}>
                                <Grid item xs={12}>
                                    <p className={classes.description}>
                                        Coloque o e-mail de sua conta, que iremos enviar um e-mail para você recuperar sua senha.
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomInput 
                                        name="email"
                                        label="E-mail"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid container className={classes.buttonsContainer}>
                                    <Grid item>
                                        <button
                                            type="submit"
                                            className={classes.submit}
                                        >
                                            {!submitLoading && "Enviar"}
                                            {submitLoading && <CircularProgress color="inherit" />}
                                        </button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                </Grid>
                <Grid container className={classes.teste}></Grid>
            </Grid>
        </Grid>
        <div className={classes.footer}>
            <div>
              <a className={classes.footerText}>{"Termos & Condições"}</a><a className={classes.footerText} >{"Políticas de Privacidade"}</a>
            </div>
        </div>
      </React.Fragment>
    );
}