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

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
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
    }

}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function RegisterOnEvent() {
    
    const classes = useStyles()
    const [submitLoading, setSubmitLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [checkedNewHere, setCheckedNewHere] = React.useState(false);
    const [checked12K, setChecked12K] = React.useState(false);
    const [checked3Ls, setChecked3Ls] = React.useState(false);
    const [sex, setSex] = useState(null);
    const [openAlert, setOpenAlert] = React.useState(false);
    const formRef = useRef(null);

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



    async function handleSubmit(data) {
        setSubmitLoading(true)
        try {
            // Remove all previous errors
            formRef.current.setErrors({});
            const schema = Yup.object().shape({
              profilePhoto: Yup.string().required(),
            });
            await schema.validate(data, {
              abortEarly: false,
            });
            // Validation passed
            console.log(data);
          } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                console.log(err)
              err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
              });
              formRef.current.setErrors(validationErrors);
            }
          }


        try {
            
            const imageBase64 = await fileToBase64(data.profilePhoto)
            console.log(imageBase64)
            const request = {
                address: data.address,
                addressNumber: data.addressNumber,
                addressComplement: data.addressComplement,
                city: data.city,
                state: data.state,
                country: data.country,
                postalCode: data.postalCode,
                phone: data.phone,
                whatsApp: data.whatsApp,
                sex: sex,
                profilePhoto: { base64: imageBase64 }
            }
            console.log(request)

            const response = await api.put("/users", request)
            setUser(response.data)
            console.log(response)
            history.push("/")
        } 
        catch(error){
            console.log(error)
            setOpenAlert(true)
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
            <Container maxWidth="md">
            <Form className={classes.form} ref={formRef} onSubmit={handleSubmit}>
            <Grid container className={classes.container}>
                <Typography component="h1" variant="h5">
                    Cadastro Maratona 3L's
                </Typography>
                <FileInput name="profilePhoto"type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
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
                <label htmlFor="avatar"/>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <InputText
                        required
                        id="firstName"
                        name="firstName"
                        label="Data de nascimento"
                        fullWidth
                        autoComplete="bday"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                            <SelectInput
                                name="sex"
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
                        required
                        id="phone"
                        name="phone"
                        label="Telefone"
                        fullWidth
                        autoComplete="tel"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <InputText
                        required
                        id="whatsapp"
                        name="whatsApp"
                        label="WhatsApp"
                        fullWidth
                        autoComplete="tel"
                    />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6} >
                    <InputText
                        required
                        id="address"
                        name="address"
                        label="Endereço"
                        fullWidth
                        autoComplete="street-address"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <InputText
                        required
                        id="addressNumber"
                        name="addressNumber"
                        label="Número"
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <InputText
                        required
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        label="CEP"
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
                        required
                        id="city"
                        name="city"
                        label="Cidade"
                        fullWidth
                        autoComplete="address-level2"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputText id="state" name="state" label="Estado" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputText
                        required
                        id="country"
                        name="country"
                        label="País"
                        fullWidth
                        autoComplete="country-name"
                    />
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

                    <Grid item>
                        <Typography variant="h6">
                            Selecione as habilidades que você considera ter:
                        </Typography>
                    </Grid>
  
                    <Grid item xs={12}>
                        <InputText
                            required
                            id="profileDescription"
                            name="profileDescription"
                            label="Conte aqui um pouco mais sobre você!"
                            multiline={true}
                            rows={3}
                            fullWidth
                            autoComplete="about you"
                            onInvalid="this.setCustomValidity('Enter User Name Here')"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {!submitLoading && "Cadastrar"}
                        {submitLoading && <CircularProgress color="inherit" />}
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
            </Form>
            </Container>
        </React.Fragment>
    )
}