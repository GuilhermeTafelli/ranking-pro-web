import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CustomSelect from '../components/input/CustomSelect'
import FileInputMult from '../components/input/FileInputMult'
import CustomInput from '../components/input/CustomInput'
import { fileToBase64 } from '../services/Utils'
import api from '../services/Api'
import CustomTextAreaWithLabel from '../components/input/CustomTextAreaWithLabel'
import * as Yup from 'yup';
import { Form } from '@unform/web';
import history from '../history'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar'
import FileInput from '../components/input/FileInput'
import CustomMenu from '../components/customMenu/CustomMenu'
const useStyles = makeStyles((theme) => ({
    main: {
        background: "#F5F6FA",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "50px",
        [theme.breakpoints.down("sm")]: {
            padding: "10px"
        },
    },
    mainContainer: {
        alignContent: "flex-start",
        justifyContent: "center"
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
    buttonsContainer: {
        justifyContent: "center",
        margin: theme.spacing(4, 0, 2),
    },
    input: {
        paddingLeft: "10px",
        paddingRight: "10px",
        alignSelf: "center"

    },
    title: {
        fontFamily: "branding-semibold",
        fontSize: "36px",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            fontSize: "25px",
        },
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
    },
    labelPhoto: {
        color: "#A8A8A8",
        fontFamily: "branding-medium",
        fontSize: "18px",
        marginTop: "50px",
        marginLeft: "16px"
    },
}));

export default function CreateInstagramProfileSimulation() {

    const classes = useStyles()
    const formRef = useRef(null);
    const [type, setType] = useState(null)
    const [file, setFile] = React.useState(null);
    const [highlights1, setHighlights1] = useState(null)
    const [highlights2, setHighlights2] = useState(null)
    const [highlights3, setHighlights3] = useState(null)
    const [highlights4, setHighlights4] = useState(null)

    async function handleSubmit(data) {

        try {

            formRef.current.setErrors({});

            const validateFile = data.foto ? Yup.mixed().test("foto", "O arquivo deve conter no máximo 2MB", validateFileSize) : Yup.mixed().required()
            const schema = Yup.object().shape({
                foto: validateFile,
                "nome da simulação": Yup.string().required(),
                "nome do perfil": Yup.string().required(),
                "número de publicações": Yup.string().required(),
                "número de seguidores": Yup.string().required(),
                "número de pessoas que está seguindo": Yup.string().required(),
                bio: Yup.string().required(),
            });


            await schema.validate(data, {
                abortEarly: false,
            });

            var highlights = []

            const profilePhotoBase64 =  await fileToBase64(data.foto)

            if(data["destaque 1"]){
                const highlights1PhotoBase64 =  await fileToBase64(data["destaque 1"])
                highlights.push(
                    {
                        image: highlights1PhotoBase64,
                        title: data["titulo destaque 1"]
                    }
                )
            }
            if(data["destaque 2"]){
                const highlights2PhotoBase64 =  await fileToBase64(data["destaque 2"])
                highlights.push(
                    {
                        image: highlights2PhotoBase64,
                        title: data["titulo destaque 2"]
                    }
                )
            }
            if(data["destaque 3"]){
                const highlights3PhotoBase64 =  await fileToBase64(data["destaque 3"])
                highlights.push(
                    {
                        image: highlights3PhotoBase64,
                        title: data["titulo destaque 3"]
                    }
                )
            }
            if(data["destaque 4"]){
                const highlights4PhotoBase64 =  await fileToBase64(data["destaque 4"])
                highlights.push(
                    {
                        image: highlights4PhotoBase64,
                        title: data["titulo destaque 4"]
                    }
                )
            }

            const request = {
                name: data["nome da simulação"],
                profileName: data["nome do perfil"],
                publications: data["número de publicações"],
                followers: data["número de seguidores"],
                following: data["número de pessoas que está seguindo"],
                bio: data.bio,
                category: data["categoria do perfil"],
                profilePhoto: profilePhotoBase64,
                highlights: highlights
            }

            const response = await api.post("/social-medias/instagram/simulations", request)

            history.push("/simulations/instagram/"+response.data.id)
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

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }
    const handleChangeHighlights1 = function handleChangeHighlights1(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setHighlights1(file);
        }
    }
    const handleChangeHighlights2 = function handleChangeHighlights2(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setHighlights2(file);
        }
    }
    const handleChangeHighlights3 = function handleChangeHighlights3(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setHighlights3(file);
        }
    }
    const handleChangeHighlights4 = function handleChangeHighlights4(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setHighlights4(file);
        }
    }

    function validateFileSize(file) {
        if (!file) return false
        if (file.size > 5000000) return false
        else return true
    }

    return (
        <React.Fragment>
            <CustomMenu/>
            <div className={classes.main}>
                <Grid container className={classes.mainContainer} md={4}>
                    <Grid item>
                        <h1 className={classes.title}>Criar Simulação de Perfil do Instagram</h1>
                    </Grid>
                    <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="nome da simulação"
                                    label="Nome da Simulação*"
                                />
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="nome do perfil"
                                    label="Nome do Perfil*"
                                />
                            </Grid>
                            <Grid container className={classes.profilePhotoContainer}>
                                <label className={classes.labelPhoto}>Foto de perfil:</label>

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
                                    <FileInput name="foto" type="file" onChange={handleChange} id="upload" accept="image/*" style={{ display: "none" }} />
                                </Grid>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="número de publicações"
                                    label="Número de publicações*"
                                />
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="número de seguidores"
                                    label="Número de seguidores*"
                                />
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="número de pessoas que está seguindo"
                                    label="Número de pessoas que está seguindo*"
                                />
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="categoria do perfil"
                                    label="Categoria do perfil"
                                />
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomTextAreaWithLabel label="Bio" name="bio" placeholder="Digite aqui..." rows="5" />
                            </Grid>
                            <Grid container className={classes.profilePhotoContainer}>
                                <label className={classes.labelPhoto}>Destaque 1:</label>

                                <Grid item className={classes.input}>
                                    <label htmlFor="highlights1">
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
                                                <Avatar className={classes.avatar} id="avatar" src={highlights1} />
                                            </Badge>
                                        </IconButton>
                                    </label>
                                </Grid>
                                <Grid item className={classes.input}>
                                    <FileInput name="destaque 1" type="file" onChange={handleChangeHighlights1} id="highlights1" accept="image/*" style={{ display: "none" }} />
                                </Grid>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="titulo destaque 1"
                                    label="Título do Destaque 1"
                                />
                            </Grid>
                            <Grid container className={classes.profilePhotoContainer}>
                                <label className={classes.labelPhoto}>Destaque 2:</label>

                                <Grid item className={classes.input}>
                                    <label htmlFor="highlights2">
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
                                                <Avatar className={classes.avatar} id="avatar" src={highlights2} />
                                            </Badge>
                                        </IconButton>
                                    </label>
                                </Grid>
                                <Grid item className={classes.input}>
                                    <FileInput name="destaque 2" type="file" onChange={handleChangeHighlights2} id="highlights2" accept="image/*" style={{ display: "none" }} />
                                </Grid>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="titulo destaque 2"
                                    label="Título do Destaque 2"
                                />
                            </Grid>
                            <Grid container className={classes.profilePhotoContainer}>
                                <label className={classes.labelPhoto}>Destaque 3:</label>

                                <Grid item className={classes.input}>
                                    <label htmlFor="highlights3">
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
                                                <Avatar className={classes.avatar} id="avatar" src={highlights3} />
                                            </Badge>
                                        </IconButton>
                                    </label>
                                </Grid>
                                <Grid item className={classes.input}>
                                    <FileInput name="destaque 3" type="file" onChange={handleChangeHighlights3} id="highlights3" accept="image/*" style={{ display: "none" }} />
                                </Grid>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="titulo destaque 3"
                                    label="Título do Destaque 3"
                                />
                            </Grid>
                            <Grid container className={classes.profilePhotoContainer}>
                                <label className={classes.labelPhoto}>Destaque 4:</label>

                                <Grid item className={classes.input}>
                                    <label htmlFor="highlights4">
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
                                                <Avatar className={classes.avatar} id="avatar" src={highlights4} />
                                            </Badge>
                                        </IconButton>
                                    </label>
                                </Grid>
                                <Grid item className={classes.input}>
                                    <FileInput name="destaque 4" type="file" onChange={handleChangeHighlights4} id="highlights4" accept="image/*" style={{ display: "none" }} />
                                </Grid>
                            </Grid>
                            <Grid item className={classes.input} xs={12}>
                                <CustomInput
                                    name="titulo destaque 4"
                                    label="Título do Destaque 4"
                                />
                            </Grid>
                            
                        </Grid>
                        <Grid container item className={classes.buttonsContainer}>
                            <Grid item>
                                <button
                                    type="submit"
                                    className={classes.submit}
                                >
                                    Simular
                                </button>
                            </Grid>
                        </Grid>
                    </Form>

                </Grid>
            </div>
        </React.Fragment>
    );
}