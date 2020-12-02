import React from 'react';

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
import MuiAlert from '@material-ui/lab/Alert';
import { login, setUser } from '../services/Auth'
import history from '../history'
import { useDispatch } from 'react-redux'
import CustomInput from '../components/input/CustomInput'
import Alert from '../components/Alert'

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
      padding: "10px"
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
      justifyContent:"center"
    },
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
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const dispatch = useDispatch()

  async function handleSubmit(data) {
    setSubmitLoading(true)
    
    try {
      const response = await api.post("/auth", data)
      
      await login(response.data.token);
      await setUser(response.data)
      await dispatch({ type: 'LOGIN'})
      await history.push("/");
    }
    catch(error){
      setOpenAlert(true) 
    };

    setSubmitLoading(false)
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false)
  };

  return (
    <React.Fragment>
      <div className={classes.main}>

      <Container component="main" maxWidth="xs">
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
          <Alert onClose={handleAlertClose} severity="error">
            Usuário ou senha inválidos!
          </Alert>
        </Snackbar>
        <CssBaseline />
        <div className={classes.paper}>
          <h1 className={classes.title}>Login</h1>
            
          <Form className={classes.form} onSubmit={handleSubmit} >
            <Grid container className={classes.formContainer}>
              <Grid item xs={12}>
                <CustomInput 
                  name="email"
                  label="E-mail"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  type="password" 
                  name="password"
                  label="Senha"
                  autoComplete="current-password"
                  autoFocus
                />
              </Grid>        
              <Grid container className={classes.buttonsContainer}>
                <Grid item>
                  <button
                    type="button"
                    className={classes.createAccount}
                  >
                    Criar Conta
                  </button>
                </Grid>
                <Grid item>
                  <button
                    type="submit"
                    className={classes.submit}
                  >
                    {!submitLoading && "Login"}
                    {submitLoading && <CircularProgress color="inherit" />}
                  </button>
                </Grid>
              </Grid>
              <Grid container item className={classes.forgotPasswordContainer} xs={12}>
                <a href="/resetPassword" className={classes.forgotPassword}>Esqueceu a senha? Clique aqui</a>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Container>
      </div>
      <div className={classes.footer}>
          <div>
            <a className={classes.footerText}>{"Termos & Condições"}</a><a className={classes.footerText} >{"Políticas de Privacidade"}</a>
          </div>
      </div>
    </React.Fragment>
  );
}