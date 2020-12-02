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

export default function StepOneForm(){

    const [file, setFile] = React.useState(null);
    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

    async function handleSubmit(data) {

        try {

            formRef.current.setErrors({});

              const schema = Yup.object().shape({
                foto: Yup.string().required(),
                "data de nascimento": Yup.string().required(),
                sexo: Yup.string().required(),
                telefone: Yup.string().required(),
                whatsApp: Yup.string().required(),
                nome: Yup.string().required(),
                email: Yup.string().required(),
            });

            await schema.validate(data, {
              abortEarly: false,
            });

            const imageBase64 = await fileToBase64(data.foto)


            console.log(data.whatsApp)

            await dispatch(
                {
                    type: "REGISTRY_STEP_ONE",                 
                    name: data.nome,
                    bday: data["data de nascimento"],
                    sex: data.sexo,
                    phone: data.telefone,
                    whatsApp: data.whatsApp,
                    email: data.email,
                    photo: data.foto,
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
    
    console.log(state)
    return (
        
        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
            <Grid container className={classes.profilePhotoContainer}>
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
                </Grid>
                <Grid item className={classes.input}>
                    <FileInput  name="foto" type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
                </Grid>
            </Grid>
            <Grid item className={classes.input} xs={12}>
                <CustomInput 
                name="nome"
                label="Nome"
                autoComplete="name"
                defaultValue={state.name}
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
                    name="data de nascimento"
                    label="Nascimento"
                    autoComplete="bday"
                    defaultValue="1111111"
                    autoFocus
                />}
                </InputMask>
            </Grid>
            <Grid item className={classes.input} xs={12} sm={7}>
                <CustomSelect
                name="sexo"
                label="Sexo"
                autoComplete="sex"
                options={["Masculino", "Feminino"]}
                defaultValue={state.sex}
                autoFocus
                />
            </Grid>
            <Grid item className={classes.input} xs={12} sm={6}>
                <CustomInput 
                name="telefone"
                label="Telefone"
                autoComplete="phone"
                defaultValue={state.phone}
                autoFocus
                />
            </Grid>
            <Grid item className={classes.input} xs={12} sm={6}>
                <CustomInput 
                name="whatsApp"
                label="WhatsApp"
                autoComplete="whatsapp"
                defaultValue={state.phone}
                autoFocus
                />
            </Grid>
            <Grid item className={classes.input} xs={12}>
                <CustomInput 
                name="email"
                label="E-mail"
                autoComplete="email"
                defaultValue={state.email}
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