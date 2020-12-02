
import React from 'react'
import { Form } from '@unform/web';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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



export default function StepOneForm() {

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
    
    return (
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

    )
}