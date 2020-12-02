
import React, { useState, useRef } from 'react'
import { Form } from '@unform/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../../components/input/CustomInput'
import CustomSelect from '../../components/input/CustomSelect'
import InputMask from 'react-input-mask'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import FileInput from '../../components/input/FileInput'
import { useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button'
import { Form } from '@unform/web';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import CustomStepper from './CustomStepper'
import InputText from './input/InputText'
import FileInput from './input/FileInput'
import SelectInput from './input/SelectInput'
import * as Yup from 'yup';
import CheckboxInput from './input/CheckboxInput'
import { fileToBase64 } from '../services/Utils'
import api from '../services/Api'
import history from '../history'
import { setUser } from '../services/Auth'
import InputAdornment from '@material-ui/core/InputAdornment';
import InstagramIcon from '@material-ui/icons/Instagram'
import YouTubeIcon from '@material-ui/icons/YouTube'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { AccountCircle } from '@material-ui/icons'
import InputMask from 'react-input-mask'

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

export default function StepOneForm() {

    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const dispatch = useDispatch()
    const classes = useStyles()


    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

    async function handleSubmit(data) {


        setSubmitLoading(true)

        try {

            formRef.current.setErrors({});

              const schema = Yup.object().shape({
                photo: Yup.string().required(),
                birthDate: Yup.string().required(),
                sex: Yup.string().required(),
                phone: Yup.string().required(),
                whatsApp: Yup.string().required(),
                name: Yup.string().required(),
            });

            await schema.validate(data, {
              abortEarly: false,
            });

            const imageBase64 = await fileToBase64(data.foto)
            console.log(imageBase64)

            const request = {
                address: data.endereço,
                addressNumber: data.número,
                addressComplement: data.addressComplement,
                city: data.cidade,
                state: data.estado,
                country: data.país,
                postalCode: data.cep,
                phone: data.telefone,
                whatsApp: data.whatsApp,
                sex: data.sexo,
                profilePhoto: { base64: imageBase64 }
            }
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                setOpenAlert(true)
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
          }

        setSubmitLoading(false)

    }
    

    return (
        <Form className={classes.form} onSubmit={handleSubmit}>
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
                <FileInput name="photo" type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
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
                name="whatsApp"
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

    )
}