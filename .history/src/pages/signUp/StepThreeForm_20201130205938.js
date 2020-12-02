import React, {  useRef } from 'react'
import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../../components/input/CustomInput'
import CustomSelect from '../../components/input/CustomSelect'
import InputMask from 'react-input-mask'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import FileInput from '../../components/input/FileInput'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import * as Yup from 'yup';
import { fileToBase64 } from '../../services/Utils'

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
    profilePhotoContainer: {
      display: "flex",
      flexDirection: "column",
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
    }
  }));

export default function StepThreeForm(){

    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)

    async function handleSubmit(data) {

        try {

            formRef.current.setErrors({});

              const schema = Yup.object().shape({
                endereço: Yup.string().required(),
                número: Yup.string().required(),
                cep: Yup.string().required(),
                complemento: Yup.string().required(),
                cidade: Yup.string().required(),
                estado: Yup.string().required(),
                país: Yup.string().required(),
            });

            await schema.validate(data, {
              abortEarly: false,
            });

            
            await dispatch(
                {
                    type: "REGISTRY_STEP_THREE",                 
                    address: data.endereço,
                    number: data.número,
                    postalCode: data.cep,
                    complement: data.complemento,
                    city: data.cidade,
                    state: data.estado,
                    country: data.país,
                }
            )
       
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
          }
    }
    

    return (

        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <CustomInput 
                    name="facebook"
                    label="Facebook"
                    autoComplete="facebook"
                    defaultValue={state.facebook}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <CustomInput 
                    name="instagram"
                    label="Instagram"
                    autoComplete="instagram"
                    defaultValue={state.instagram}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <CustomInput 
                    name="linkedin"
                    label="LinkedIn"
                    autoComplete="linkedin"
                    defaultValue={state.linkedin}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <CustomInput 
                    name="twitter"
                    label="Twitter"
                    defaultValue={state.twitter}
                    autoComplete="twitter"
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <CustomInput 
                    name="youtube"
                    label="Youtube"
                    autoComplete="youtube"
                    defaultValue={state.youtube}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <CustomInput 
                        name="tiktok"
                        label="Tik Tok"
                        autoComplete="tiktok"
                        defaultValue={state.tiktok}
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
                    Continuar
                </button>
            </Grid>
            </Grid>
      </Form>

    )
}