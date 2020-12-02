import React from 'react'
import { Form } from '@unform/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import CustomInput from '../../components/input/CustomInput'
import CustomSelect from '../../components/input/CustomSelect'
import Alert from '../../components/Alert'
import {ReactComponent as BackIcon} from '../../static/back.svg'
import InputMask from 'react-input-mask'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import FileInput from '../../components/input/FileInput'
import { useDispatch } from 'react-redux'


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
    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const dispatch = useDispatch()


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
                    <a className={classes.blackLink} href="/signIn" textDecoration="none" style={{display: "flex"}}>
                        <BackIcon display="flex"/>
                        <h5 className={classes.back}>Voltar</h5>
                    </a>
                </Grid>
                <Grid container item  className={classes.mainContainer} xs={12} sm={10} md={6} lg={3}>
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
                    <Grid item className={classes.input} xs={12}>
                      <CustomInput 
                        name="name"
                        label="Nome"
                        autoComplete="name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12} sm={5}>
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
                    <Grid item className={classes.input} xs={12} sm={7}>
                      <CustomSelect
                        name="sex"
                        label="Sexo"
                        autoComplete="sex"
                        options={["Masculino", "Feminino"]}
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12} sm={6}>
                      <CustomInput 
                        name="phone"
                        label="Telefone"
                        autoComplete="phone"
                        autoFocus
                      />
                    </Grid>
                    <Grid item className={classes.input} xs={12} sm={6}>
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
                  </Grid>
                  <Grid container item className={classes.buttonsContainer}>
                    <Grid item>
                      <button
                          type="submit"
                          className={classes.submit}
                      >
                          {!submitLoading && "Continuar"}
                          {submitLoading && <CircularProgress color="inherit" />}
                      </button>
                    </Grid>
                  </Grid>
                </Form>
                
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