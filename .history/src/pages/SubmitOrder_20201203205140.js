import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from '../components/input/CustomInput'
import CustomSelect from '../components/input/CustomSelect'
import FileInputMult from '../components/input/FileInputMult'

import CustomTextAreaWithLabel from '../components/input/CustomTextAreaWithLabel'

import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { Form } from '@unform/web';

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

  const dispatch = useDispatch()
  const classes = useStyles()
  const formRef = useRef(null);
  const state = useSelector(state => state.registry)


  const orderTypes =  [{name: "Solicitar Medalha 3 mil", value: 1}, {name: "Feminino", value: 2}]

  async function handleSubmit(data) {

      try {

          formRef.current.setErrors({});

            const schema = Yup.object().shape({
              "tipo da solicitação": Yup.string().required(),
              arquivos: Yup.string().required(),
              descrição: Yup.string().required(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const request = {
            fullName: state.name,
            birthDate: state.bday,
            sex: state.sex,
            cpf: state.cpf,
            email: state.email,
            address: state.address,
            addressNumber: state.number,
            addressComplement: state.complement,
            city: state.city,
            state: state.addressState,
            country: state.country,
            postalCode: state.postalCode,
            whatsApp: state.whatsApp,
            profilePhoto: { base64: state.photo },
            password: data.senha
        }

        console.log(data.arquivos)

        const imageBase64 = await fileToBase64(data.a)

        const response = await api.post("/users", request)

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
    <React.Fragment>
        <div className={classes.main}>
            <Grid container className={classes.mainContainer} md={4}>
                <h1>Novo Ticket</h1>
                <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item className={classes.input} xs={12} sm={12}>
                    <CustomSelect
                    name="tipo da solicitação"
                    label="Tipo da solicitação*"
                    options={orderTypes}
                    autoFocus
                    />
                </Grid>
                <Grid item className={classes.input} xs={12}>
                        <CustomTextAreaWithLabel label="Descrição" name="descrição" placeholder="Digite aqui..." rows="5"/>
                    </Grid>
                <Grid item className={classes.input} xs={12}>
                    <FileInputMult name="arquivos" label="Insira abaixo todos os documentos que comprovem a solicitação escolhida"/>
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