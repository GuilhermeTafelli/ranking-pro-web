import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import history from '../history'
import CustomMenu from '../components/CustomMenu'
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
        alignContent: "flex-start"
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

export default function SubmitOrder() {
  const classes = useStyles();

    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);


  return (
    <React.Fragment>
        <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={8}>
                <h1>Novo Ticket</h1>
                <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item className={classes.input} xs={12}>
                    <CustomInput 
                    name="endereço"
                    label="Endereço*"
                    autoComplete="address"
                    defaultValue={state.address}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={6} sm={3}>
                    <CustomInput 
                    name="número"
                    label="Número*"
                    autoComplete="number"
                    defaultValue={state.number}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={6} sm={4}>
                    <CustomInput 
                    name="cep"
                    label="CEP*"
                    autoComplete="cep"
                    defaultValue={state.postalCode}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={5}>
                    <CustomInput 
                    name="complemento"
                    label="Complemento"
                    defaultValue={state.complement}
                    autoComplete="complemento"
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={6}>
                    <CustomInput 
                    name="cidade"
                    label="Cidade*"
                    autoComplete="city"
                    defaultValue={state.city}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={6}>
                    <CustomInput 
                    name="estado"
                    label="Estado*"
                    autoComplete="estado"
                    defaultValue={state.addressState}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={5}>
                    <CustomInput 
                    name="país"
                    label="País*"
                    defaultValue={state.country}
                    autoComplete="country"
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

            </Grid> 
        </div>
    </React.Fragment>
  );
}