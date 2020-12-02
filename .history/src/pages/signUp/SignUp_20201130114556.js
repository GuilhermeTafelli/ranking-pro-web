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
import CustomSelect from '../../components/input/CustomSelect'
import EditAvatar from '../../components/EditAvatar'
import Alert from '../../components/Alert'
import {ReactComponent as BackIcon} from '../../static/back.svg'
import InputMask from 'react-input-mask'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import FileInput from '../../components/input/FileInput'


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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "20px"
      },
      paddingTop: "68px",
      height: "100%"
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
    signUpContent: {
        justifyContent: "center",
        marginTop: "60px"
    },
    back: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#000000",
        marginLeft: "10px"
    },
    containerBack: {
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
    },
    form: {
      width: '100%',
    },
    input: {
      padding: "5px 10px",
      alignSelf: "center"

    },
    profilePhotoContainer: {
      display: "flex",
      justifyContent: "center",
    },
    avatar: {
      width: "230px",
      height: "230px",
      [theme.breakpoints.up("sm")]: {
          width: "268px",
          height: "268px"
      },
    },
    editAvatar: {
        width: "53px",
        height: "53px",
        [theme.breakpoints.up("sm")]: {
            width: "70px",
            height: "70px"
        },
        border: `3px solid #F5F6FA`
    },
    editIcon: {
        width: "32px",
        height: "32px",
        [theme.breakpoints.up("sm")]: {
            width: "40px",
            height: "40px"
        },
    },
    grow:{
      flexGrow: 1
    },
    grow2: {
      height: "100vh"
    }
  }));

export default function SignUp() {

    const classes = useStyles()
    const [openAlert, setOpenAlert] = React.useState(false);
    const [submitLoading, setSubmitLoading] = React.useState(false);

    const [file, setFile] = React.useState(null);

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

    async function handleSubmit(data) {
    }
    
      const handleAlertClose = (event, reason) => {

        if (reason === 'clickaway') {
          return;
        }

        setOpenAlert(false)
      
      };

    return (
        <React.Fragment className={classes.grow1}>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert onClose={handleAlertClose} severity="error">
              Usuário ou senha inválidos!
            </Alert>
        </Snackbar>
        <Grid container className={classes.main} style={{background: "red"}}>
          <Grid item>
              <h1 className={classes.title}>Cadastro</h1>
          </Grid>
            <Grid container className={classes.signUpContent}>
                <Grid container item className={classes.containerBack} sm={1}>
                    <a className={classes.blackLink} href="/signIn" textDecoration="none" style={{display: "flex"}}>
                        <BackIcon display="flex"/>
                        <h5 className={classes.back}>Voltar</h5>
                    </a>
                </Grid>
                <Grid container item  className={classes.mainContainer} sm={12} lg={3}>
                <Form className={classes.form}>
                  <Grid container>
                    <Grid container item className={classes.profilePhotoContainer}>
                      <Grid item className={classes.input}>
                        <label htmlFor="upload">
                          <IconButton color="primary" aria-label="upload picture" component="span">
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <Avatar className={classes.editAvatar}>
                                    <EditIcon className={classes.editIcon}/>
                                </Avatar>
                            } 
                          >
                              <Avatar className={classes.avatar} id="avatar" src={file}/>
                          </Badge>
                          </IconButton>
                        </label>
                        <FileInput name="foto" type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
                        <label htmlFor="avatar"/>                    
                      </Grid>
                    </Grid>
                    <Grid item className={classes.input} xs={12} md={5}>
                      <InputMask
                        mask="99/99/9999"
                        maskChar=" "
                        disabled={false}
                      >
                        {() => <CustomInput 
                          name="birthDate"
                          label="Nascimento"
                          autoComplete="bday"
                          autoFocus
                        />}
                      </InputMask>
                    </Grid>
                    <Grid item className={classes.input} xs={12} md={7}>
                      <CustomSelect
                        name="sex"
                        label="Sexo"
                        autoComplete="sex"
                        options={["Masculino", "Feminino"]}
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12} md={6}>
                      <CustomInput 
                        name="phone"
                        label="Telefone"
                        autoComplete="phone"
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12} md={6}>
                      <CustomInput 
                        name="whatsapp"
                        label="WhatsApp"
                        autoComplete="whatsapp"
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12}>
                      <CustomInput 
                        name="email"
                        label="E-mail"
                        autoComplete="email"
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12}>
                      <CustomInput 
                        type="password"
                        name="password"
                        label="Senha"
                        autoComplete="password"
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                </Form>
                </Grid>
                <Grid container item className={classes.teste} sm={1}></Grid>
            </Grid>
        </Grid>
        <Grid item className={classes.grow} style={{background: "blue", minHeight: "100%"}}>a</Grid>

        {/* <div className={classes.footer}>
            <div>
              <a className={classes.footerText}>{"Termos & Condições"}</a><a className={classes.footerText} >{"Políticas de Privacidade"}</a>
            </div>
        </div> */}
      </React.Fragment>
    );
}