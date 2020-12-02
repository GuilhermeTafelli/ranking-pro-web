import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from '@unform/web';
import InputText from '../components/input/InputText'
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../services/Api'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { login, setUser } from '../services/Auth'
import history from '../history'
import { useDispatch } from 'react-redux'
import { Height } from '@material-ui/icons'; 
import CustomInput from '../components/input/CustomInput'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    fontFamily: "branding-bold",
    fontSize: "24px",
    color: "#FFF",
    backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
    borderRadius: "31px",
    border: "none",
    padding: "10px 26px",
    marginLeft: "10px",
    verticalAlign: "middle",
  },
  createAccount: {
    backgroundColor: "#D4D4D4",
    borderRadius: "31px",
    border: "none",
    padding: "10px 26px",
    fontFamily: "branding-medium",
    color: "#858585",
    fontSize: "24px"
  },
  title: {
    fontFamily: "branding-semibold",
    fontSize: "36px"

  },
  main: {
    background: "#F5F6FA",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsContainer:{
    justifyContent: "flex-end",
    margin: theme.spacing(4, 0, 2),
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
            <Grid container>
              <Grid item xs={12}>
                <CustomInput 
                  name="email"
                  label="E-mail"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item>
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
            </Grid>
          </Form>
        </div>
      </Container>
      </div>

    </React.Fragment>
  );
}