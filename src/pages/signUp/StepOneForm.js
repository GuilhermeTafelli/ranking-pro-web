import React, { useRef } from 'react'
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
import moment from 'moment'
import api from '../../services/Api'

const useStyles = makeStyles((theme) => ({

    form: {
        width: '100%',
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
    buttonsContainer: {
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

export default function StepOneForm(props) {

    const { handleAlertOpen } = props

    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)
    const [file, setFile] = React.useState(null);
    const [teste, setTeste] = React.useState(null);

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

    function validateFileSize(file) {
        if (!file) return false
        if (file.size > 5000000) return false
        else return true
    }

    async function handleSubmit(data) {
        try {
            formRef.current.setErrors({});

            const validateFile = data.foto ? Yup.mixed().test("foto", "O arquivo deve conter no máximo 2MB", validateFileSize) : Yup.mixed().required()
            const schema = Yup.object().shape({
                foto: validateFile,
                "data de nascimento": Yup.date().transform((value, rawValue) => { let correctDate = moment(rawValue, ['DD/MM/YYYY']).toDate(); return correctDate }).max(moment(new Date(2005, 1, 1)).toDate()),
                sexo: Yup.string().required(),
                cpf: Yup.string().required(),
                whatsApp: Yup.string().required(),
                nome: Yup.string().required(),
                email: Yup.string().required().email(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            const response = await api.get("/users/email/" + data.email)
            if (response.data.exists) {
                handleAlertOpen("E-mail já cadastrado, entre em contato com o suporte.")
                return
            }

            const responseCpf = await api.get("/users/cpf/" + data.cpf)
            if (responseCpf.data.exists) {
                handleAlertOpen("CPF já cadastrado, entre em contato com o suporte.")
                return
            }

            const imageBase64 = await fileToBase64(data.foto)

            await dispatch(
                {
                    type: "REGISTRY_STEP_ONE",
                    name: data.nome,
                    bday: data["data de nascimento"],
                    sex: data.sexo,
                    cpf: data.cpf,
                    phone: data.telefone,
                    whatsApp: data.whatsApp,
                    email: data.email,
                    photo: imageBase64,
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
            if (err.response) {
                handleAlertOpen("Falha no cadastro! Favor entrar em contato com o suporte.")
             }
        }
    }

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
                                            <EditIcon className={classes.editIcon} />
                                        </Avatar>
                                    }
                                >
                                    <Avatar className={classes.avatar} id="avatar" src={file} />
                                </Badge>
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item className={classes.input}>
                        <FileInput name="foto" type="file" value={teste} onChange={handleChange} id="upload" accept="image/*" style={{ display: "none" }} />
                    </Grid>
                </Grid>
                <Grid item className={classes.input} xs={12}>
                    <CustomInput
                        name="nome"
                        label="Nome Completo*"
                        autoComplete="name"
                        maxLength="40"
                        defaultValue={state.name}
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={5}>
                    <InputMask
                        mask="99/99/9999"
                        maskChar=" "
                        defaultValue={state.bday}
                        disabled={false}
                    >
                        {() => <CustomInput
                            name="data de nascimento"
                            label="Nascimento*"
                            autoComplete="bday"
                        />}
                    </InputMask>
                </Grid>
                <Grid item className={classes.input} xs={12} sm={7}>
                    <CustomSelect
                        name="sexo"
                        label="Sexo*"
                        autoComplete="sex"
                        options={[{ name: "Masculino", value: 1 }, { name: "Feminino", value: 2 }]}
                        defaultValue={state.sex}
                    />
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        defaultValue={state.bday}
                        disabled={false}
                    >
                        {() =>
                            <CustomInput
                                name="cpf"
                                label="CPF*"
                                autoComplete="cpf"
                                defaultValue={state.cpf}
                            />}
                    </InputMask>
                </Grid>
                <Grid item className={classes.input} xs={12} sm={6}>

                    <CustomInput
                        name="whatsApp"
                        label="WhatsApp*"
                        autoComplete="whatsapp"
                        defaultValue={state.whatsApp}
                    />
                </Grid>
                <Grid item className={classes.input} xs={12}>
                    <CustomInput
                        name="email"
                        label="E-mail*"
                        autoComplete="email"
                        defaultValue={state.email}
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
        </Form >

    )
}