import React, { useRef, useState } from 'react'
import { Form } from '@unform/web';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup';
import api from '../../services/Api'
import { setUser, login } from '../../services/Auth'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckboxInput from '../../components/input/CheckboxInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import history from '../../history'
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
        fontFamily: "branding-light",
        fontSize: "30px"
    },
    subTitle: {
        margin: "30px 0px",
        fontFamily: "branding-semibold",
        fontSize: "38px",
    },
    terms: {
        fontFamily: "branding-medium",
        color: "#C1C1C1",
        textAlign: "justify"
    },
    termsButton: {
        fontFamily: "branding-medium",
        color: "#244CF4",
        textAlign: "justify",
        textDecoration: "none"
    },
    error: {
        color: "red",
        opacity:"70%",
        marginLeft: "16px",
        textAlign: "justify",
        display: "block",
      },
}));


const CustomCheckbox = withStyles({
    root: {
        color: "#0B38F2",
        '&$checked': {
            color: "#0B38F2",
        },
    },
    checked: {},
})((props) => <CheckboxInput color="default" {...props} />);

export default function StepFiveForm() {

    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)
    const [error, setError] = useState(false);
    const [checkedNewHere, setCheckedNewHere] = useState(false);
    const [checked12K, setChecked12K] = useState(false);
    const [checked3Ls, setChecked3Ls] = useState(false);

    async function handleSubmit(data) {

        try {

            if(!checked3Ls && !checked12K && !checkedNewHere) {
                setError("Selecione pelo menos um")
                return
            }

            var whereYouFrom = []

            if(checkedNewHere){
                whereYouFrom.push("NEW_USER")
            }

            if(checked12K){
                whereYouFrom.push("12K_USER")
            }

            if(checked3Ls){
                whereYouFrom.push("3LS_USER")
            }

            await dispatch(
                {
                    type: "REGISTRY_STEP_FIVE",
                    whereYouFrom: whereYouFrom
                }
            )

        } catch (err) {
            console.log(err)
        }
    }


    return (

        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <h2 className={classes.title}>Estamos quase acabando, mas antes gostaríamos de saber:</h2>
                    <h3 className={classes.subTitle}> Onde você nos conheceu ?</h3>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                        control={<CustomCheckbox name="newHere" value={checkedNewHere} onChange={(event) => setCheckedNewHere(event.target.checked)} />}
                        label="Sou nova(o) por aqui."
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<CustomCheckbox name="12KStudent" value={checked12K} onChange={(event) => setChecked12K(event.target.checked)} />}
                        label="Sou aluna(o) 12K"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<CustomCheckbox name="3LsStudent" value={checked3Ls} onChange={(event) => setChecked3Ls(event.target.checked)} />}
                        label="Sou aluna(o) 3L's"
                    />
                </Grid>
                {error && <span className={classes.error}>{error}</span>}
            </Grid>
            <Grid container item className={classes.buttonsContainer}>
                <Grid item>
                    <button type="submit" className={classes.submit}>Continuar</button>
                </Grid>
            </Grid>
        </Form>

    )
}