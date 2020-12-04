import { CssBaseline } from '@material-ui/core'
import React, { useState, useRef } from 'react'
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
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: "#BEB6AE",
        justifyContent: 'center',
    },
    container2: {
        flexDirection: 'row',
        backgroundColor: "#BEB6AE",
        justifyContent: 'center',
    },
    profileContainer: {
        backgroundColor: "#BEB6AE",
        marginTop: "50px",
        marginBottom: "50px",
        alignItems: "flex-start"
    }, 
    profileItem: {
        backgroundColor: "#FFFFFF",
        marginRight: "10px",
        marginLeft: "10px",
        marginBottom: "15px",
        borderRadius: "7px",
        padding: "10px",
        width: "100%"
    },
    mainItemContainer: {
        marginRight: "10px",
        marginLeft: "10px",
    },
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: "20px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: "230px",
        height: "230px",
        [theme.breakpoints.up("sm")]: {
            width: "300px",
            height: "300px"
        },
    },
    editAvatar: {
        width: "53px",
        height: "53px",
        [theme.breakpoints.up("sm")]: {
            width: "70px",
            height: "70px"
        },
        border: `2px solid ${theme.palette.background.paper}`
    },
    editIcon: {
        width: "32px",
        height: "32px",
        [theme.breakpoints.up("sm")]: {
            width: "40px",
            height: "40px"
        },
    },
    social: {
        flexGrow: "1"
    },
    number: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
    },
    skills:{
        padding: "15px"
    },
    button: {
        backgroundColor: "#3e554a",
        height: "50px",
        borderRadius: "20px",
        textColor: "#FFFFF",
        "&:hover": {
            backgroundColor: "#3e554a",
            opacity: "80%"
        }

    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function RegisterOnEvent() {
    
    const classes = useStyles()
    const [submitLoading, setSubmitLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [checkedNewHere, setCheckedNewHere] = useState(false);
    const [checked12K, setChecked12K] = useState(false);
    const [checked3Ls, setChecked3Ls] = useState(false);
    const [sex, setSex] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const formRef = useRef(null);

    const initialSkills = {
        skillsSeleted: 0,
        skills: [
            {
                name: "Criativo",
                selected: false
            },
            {
                name: "Proativo",
                selected: false
            },
            {
                name: "Proativo",
                selected: false
            },
            {
                name: "Proativo",
                selected: false
            },
            {
                name: "Proativo",
                selected: false
            },
            {
                name: "Proativo",
                selected: false
            },
            {
                name: "Proativo",
                selected: false
            }
        ]
}

    const [skills, setSkills] = useState(initialSkills)


    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

   

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlert(false)
    };
    const handleSkillClick = function handleSkillClick(index){
        var newSkills = skills.skills

        if(newSkills[index].selected === true){
            newSkills[index].selected = false
            setSkills({skillsSeleted: skills.selected-1, skills: newSkills})
        }

        else {
            newSkills[index].selected = true
            setSkills({skillsSeleted: skills.selected+1, skills: newSkills})
        }

    };



    async function handleSubmit(data) {

        setSubmitLoading(true)

        try {

            data.sexo = sex

            formRef.current.setErrors({});

            const schema = Yup.object().shape({
              foto: Yup.string().required(),
              "data de nascimento": Yup.string().required(),
              sexo: Yup.string().required(),
              telefone: Yup.string().required(),
              whatsApp: Yup.string().required(),
              endereço: Yup.string().required(),
              número: Yup.string().required(),
              cep: Yup.string().required(),
              cidade: Yup.string().required(),
              estado: Yup.string().required(),
              país: Yup.string().required(),
              instagram: Yup.string().required(),
              facebook: Yup.string().required(),
              "sobre mim": Yup.string().required(),

            });

            await schema.validate(data, {
              abortEarly: false,
            });

            const imageBase64 = await fileToBase64(data.foto)

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

            console.log(request)

            const response = await api.put("/users", request)


            setUser(response.data)
            console.log(response)
            history.push("/")
            const requestSocialMedia = {
                userId: response.data.user,
                instagram: data.instagram,
                facebook: data.facebook,
                youtube: data.youtube,
                linkedin: data.linkedin,
                aboutMe: data.sobre_mim,
                whereYouFrom: "whereYouFrom",
                monthlyInvoicing: 2000,
                skills: ["BOM", "DMAIS", "DA CONTA"],
                currentContracts: 1
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
        <React.Fragment>
            <CssBaseline/>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={handleAlertClose} severity="error">
                    Erro ao cadastrar na Maratona 3LS
                </Alert>
            </Snackbar>
            <Grid container className={classes.container2}>
                <Grid container className={classes.profileContainer} xs={12} md={8} >
                    <Grid item  className={classes.mainItemContainer}>
                        <Grid container>
                            <Grid item className={classes.profileItem}>
                                <Form ref={formRef} onSubmit={handleSubmit}>
                                <Grid container className={classes.container} md={12}>
                                    <Typography component="h1" variant="h5">
                                        Cadastro Maratona
                                    </Typography>
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
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                        
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <InputMask
                                            mask="99/99/9999"
                                            maskChar=" "
                                            disabled={false}
                                        >
                                            {() => 
                                            <InputText
                                                id="firstName"
                                                name="data de nascimento"
                                                label="Data de nascimento *"
                                                fullWidth
                                                autoComplete="bday"
                                            >
                                            </InputText>}
                                    </InputMask>
                                        
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <FormControl className={classes.formControl} fullWidth>
                                                <InputLabel id="demo-simple-select-label">Sexo *</InputLabel>
                                                <SelectInput
                                                    name="sexo"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={sex}
                                                    onChange={(event) => setSex(event.target.value)}
                                                >
                                                <MenuItem value={1}>Feminino</MenuItem>
                                                <MenuItem value={2}>Masculino</MenuItem>
                                                <MenuItem value={3}>Prefiro não informar</MenuItem>
                                                </SelectInput>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <InputText
                                            id="phone"
                                            name="telefone"
                                            label="Telefone *"
                                            fullWidth
                                            autoComplete="tel"
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <InputText
                                            id="whatsapp"
                                            name="whatsApp"
                                            label="WhatsApp *"
                                            type="tel"
                                            fullWidth
                                            autoComplete="tel"
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={12} lg={6} >
                                        <InputText
                                            id="address"
                                            name="endereço"
                                            label="Endereço *"
                                            fullWidth
                                            autoComplete="street-address"
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <InputText
                                            id="addressNumber"
                                            name="número"
                                            label="Número *"
                                            fullWidth
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <InputText
                                            className={{
                                                "-webkit-outer-spin-button": { 
                                                    "-webkit-appearance": "none", 
                                                    margin: 0
                                                }
                                            }}
                                            id="postalCode"
                                            name="cep"
                                            label="CEP *"
                                            fullWidth
                                            autoComplete="postal-code"
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <InputText
                                            id="addressComplement"
                                            name="addressComplement"
                                            label="Complemento"
                                            fullWidth
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <InputText
                                            id="city"
                                            name="cidade"
                                            label="Cidade *"
                                            fullWidth
                                            autoComplete="address-level2"
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputText id="state" name="estado" label="Estado *" fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        <InputText
                                            id="country"
                                            name="país"
                                            label="País *"
                                            fullWidth
                                            autoComplete="country-name"
                                        />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <InstagramIcon/>                           
                                                </Grid>
                                                <Grid item className={classes.social}>
                                                    <InputText
                                                    id="instagram"
                                                    name="instagram"
                                                    label="Instagram *"
                                                    fullWidth
                                                    autoComplete="instagram"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">instagram.com/</InputAdornment>,
                                                    }}
                                                    />                        
                                                    
                                                </Grid>
                                            </Grid>              
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <FacebookIcon/>                           
                                                </Grid>
                                                <Grid item className={classes.social}>
                                                    <InputText
                                                    id="facebook"
                                                    name="facebook"
                                                    label="Facebook *"
                                                    fullWidth
                                                    autoComplete="Facebook"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">facebook.com/</InputAdornment>,
                                                    }}
                                                    />                        
                                                    
                                                </Grid>
                                            </Grid>              
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <YouTubeIcon/>                           
                                                </Grid>
                                                <Grid item className={classes.social}>
                                                    <InputText
                                                    id="youtube"
                                                    name="youtube"
                                                    label="Youtube"
                                                    fullWidth
                                                    autoComplete="youtube"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">youtube.com/users/</InputAdornment>,
                                                    }}
                                                    />                        
                                                    
                                                </Grid>
                                            </Grid>              
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Grid container spacing={1} alignItems="flex-end">
                                                <Grid item>
                                                    <LinkedInIcon/>                           
                                                </Grid>
                                                <Grid item className={classes.social}>
                                                    <InputText
                                                    id="linkedin"
                                                    name="linkedin"
                                                    label="LinkedIn"
                                                    fullWidth
                                                    autoComplete="linkedin"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">linkedin.com/in/</InputAdornment>,
                                                    }}
                                                    />                        
                                                </Grid>
                                            </Grid>              
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">
                                                De onde veio?
                                            </Typography>
                                            <Grid item>
                                                <FormControlLabel
                                                    control={<CheckboxInput color="secondary" name="newHere" value={checkedNewHere} onChange={(event) => setCheckedNewHere(event.target.checked)}/>}
                                                    label="Sou nova(o) por aqui."
                                                />
                                            </Grid>
                                            <Grid item>
                                                <FormControlLabel
                                                    control={<CheckboxInput color="secondary" name="12KStudent" value={checked12K} onChange={(event) => setChecked12K(event.target.checked)}/>}
                                                    label="Sou aluna(o) 12K"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <FormControlLabel
                                                    control={<CheckboxInput color="secondary" name="3LsStudent" value={checked3Ls} onChange={(event) => setChecked3Ls(event.target.checked)}/>}
                                                    label="Sou aluna(o) 3L's"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">
                                                        Selecione as habilidades que você considera ter:
                                                    </Typography>
                                                </Grid>
                                                <Grid item className={classes.skills} xs={12}>
                                                    <Grid container spacing={1} xs={12}>
                                                    {skills.skills.map((skill, index) => 
                                                        <Grid item>
                                                        <Chip color={skill.selected ? "primary" : "default"} icon={<FaceIcon />} clickable label={skill.name} onClick={() => handleSkillClick(index)}/>
                                                        </Grid>
                                                    )}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>
                    
                                        <Grid item xs={12}>
                                            <InputText
                                                id="profileDescription"
                                                name="sobre mim"
                                                label="Conte aqui um pouco mais sobre você! *"
                                                multiline={true}
                                                rows={3}
                                                fullWidth
                                                autoComplete="about you"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            className={classes.button}
                                        >
                                            {!submitLoading && "Cadastrar"}
                                            {submitLoading && <CircularProgress color="inherit" />}
                                        </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </React.Fragment>
    )
}