import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../components/Alert'
import {ReactComponent as BackIcon} from '../../static/back.svg'
import { useSelector, useDispatch } from 'react-redux'
import StepOneForm from './StepOneForm'
import StepTwoForm from './StepTwoForm'
import StepThreeForm from './StepThreeForm'
import StepFourForm from './StepFourForm'
import StepFiveForm from './StepFiveForm'
import history from  '../../history'

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
      height: "100%",
      minHeight: "95vh",
      display: "flex",
      flexDirection: "column", 
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "50px 15px"
      },
      paddingTop: "50px"
    },
    buttonsContainer:{
      justifyContent: "center",
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
      minHeight: "5vh",
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
    mainContainer: {
      flexGrow: 2,
    },
    form: {
      width: '100%',
    },
    input: {
      paddingLeft: "10px",
      paddingRight: "10px",
      alignSelf: "center"

    },
    profilePhotoContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",
      marginBottom: "30px"
    },
    avatar: {
      width: "230px",
      height: "230px",
      color: "#808080",
      [theme.breakpoints.up("sm")]: {
          width: "267px",
          height: "267px"
      },
    },
    editAvatar: {
        width: "53px",
        height: "53px",
        [theme.breakpoints.up("sm")]: {
            width: "70px",
            height: "70px"
        },
        border: `3px solid ${theme.palette.background.paper}`
    },
    editIcon: {
        width: "32px",
        height: "32px",
        color: "#808080",
        [theme.breakpoints.up("sm")]: {
            width: "40px",
            height: "40px"
        },
    },
    grow: {
        flexGrow: 1
    },
    conatinerTeste: {
      height: "100%",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      background: "red"
    }
  }));

export default function SignUp() {

    const classes = useStyles()
    const [openAlert, setOpenAlert] = React.useState(false);
    const state = useSelector(state => state.registry)
    const dispatch = useDispatch()

    function backStep(){

      if(state.step > 1) dispatch({ type: "BACK_STEP" })
      else history.goBack()
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
          <Grid item>
              <h1 className={classes.title}>Cadastro</h1>
          </Grid>
            <Grid container item className={classes.resetPassowordContent}>
                <Grid container item className={classes.containerBack} sm={1}>
                    <a className={classes.blackLink} onClick={backStep} textDecoration="none" style={{display: "flex"}}>
                        <BackIcon display="flex"/>
                        <h5 className={classes.back}>Voltar</h5>
                    </a>
                </Grid>
                <Grid container item  className={classes.mainContainer} xs={12} sm={10} md={6} lg={3}>
                  {state.step == 1 && <StepOneForm/>}
                  {state.step == 2 && <StepTwoForm/>}
                  {state.step == 3 && <StepThreeForm/>}
                  {state.step == 4 && <StepFourForm/>}
                  {state.step == 5 && <StepFiveForm/>}

                </Grid>
                <Grid container item className={classes.grow} sm={1}></Grid>
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