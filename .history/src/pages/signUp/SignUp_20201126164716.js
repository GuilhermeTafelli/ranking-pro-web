import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Form } from '@unform/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/Api'
import Snackbar from '@material-ui/core/Snackbar';
import { login, setUser } from '../../services/Auth'
import history from '../../history'
import { useDispatch } from 'react-redux'
import CustomInput from '../../components/input/CustomInput'
import Alert from '../../components/Alert'
import {ReactComponent as BackIcon} from '../../static/back.svg'

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
      flexDirection: "colunm",
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
    },
    mainContainer: {
      flexGrow: 2,
    }
  }));

export default function SignUp() {

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
            <Grid item >
              a
            </Grid>
            <Grid container className={classes.resetPassowordContent}>
                <Grid container item className={classes.containerBack} sm={1}>
                    <a className={classes.blackLink} href="/signIn" textDecoration="none" style={{display: "flex"}}>
                        <BackIcon display="flex"/>
                        <h5 className={classes.back}>Voltar</h5>
                    </a>
                </Grid>
                <Grid container item  className={classes.mainContainer} sm={8} lg={4}>
                </Grid>
                <Grid container item className={classes.teste} sm={1}></Grid>
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