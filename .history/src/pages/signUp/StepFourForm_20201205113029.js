import React, { useRef, useState } from 'react'
import { Form } from '@unform/web';
import { makeStyles } from '@material-ui/core/styles';
import CustomTextArea from '../../components/input/CustomTextArea'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import * as Yup from 'yup';

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
        padding: "15px 32px",
        alignSelf: "center",
        backgroundColor: "#FFF",
        borderRadius: "30px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        marginTop: "30px"

    },
    inputTitle: {
        fontFamily: "branding-semibold",
        fontSize: "22px"
    },
    inputSkills: {
        borderRadius: "0px",
        borderWidth: "0px 0px 0px 0px",
        borderBottom: "0.1em solid #707070",
        padding: "1px",
        height: "30px",
        fontFamily: "branding-medium"
    },
    addSkills: {
        fontFamily: "branding-bold",
        fontSize: "35px",
        color: "#707070",
        marginLeft: "5px",
        cursor: "pointer"
    },
    inputSkillsContainer: {
        alignItems: "center",
        marginBottom: "15px"
    }
}));

export default function StepFourForm() {

    const dispatch = useDispatch()
    const classes = useStyles()
    const formRef = useRef(null);
    const state = useSelector(state => state.registry)
    const [skill, setSkill] = useState("")
    const [skills, setSkills] = useState(state.skills)
    const [niche, setNiche] = useState("")
    const [niches, setNiches] = useState(state.niches)

    async function handleSubmit(data) {

        try {
            console.log(1)
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
                "sobre mim": Yup.string().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });


            await dispatch(
                {
                    type: "REGISTRY_STEP_FOUR",
                    aboutMe: data["sobre mim"],
                    skills: skills, 
                    niches: niches
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

    function handleSubmitKeyPress(event){
        console.log("2")
        event.stopPropagation()
    }


    function handleSubmitSkill() {
        setSkill("")
        if(skill){
            setSkills([...skills, skill])
        }
    }

    function handleSkillChange(event) {
        setSkill(event.target.value)
    }

    function handleSubmitNiche() {
        setNiche("")
        if(niche){
            setNiches([...niches, niche])
        }
    }

    function handleNicheChange(event) {
        setNiche(event.target.value)
    }

    function handleDeleteNiche(item){
        var newNiches = niches
        newNiches.splice(newNiches.indexOf(item), 1);
        setNiches(newNiches)
    }

    return (

        <Form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
            <Grid container>
                <Grid container item className={classes.input} xs={12}>
                    <Grid item xs={12}>
                        <h2 className={classes.inputTitle}>Conte mais sobre você</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextArea name="sobre mim" placeholder="Digite aqui..." rows="5" defaultValue={state.aboutMe} />
                    </Grid>
                </Grid>
                <Grid container item className={classes.input} xs={12}>
                    <Grid item xs={12}>
                        <h2 className={classes.inputTitle}>Quais são suas habiliades?</h2>
                    </Grid>
                    <Grid container item className={classes.inputSkillsContainer}>
                        <Grid item>
                            <input value={skill} onKeyDown={(event) => { if (event.keyCode === 13){ event.preventDefault();handleSubmitSkill()}}} onChange={handleSkillChange} className={classes.inputSkills} />
                        </Grid>
                        <Grid item>
                            <a className={classes.addSkills} onClick={handleSubmitSkill}>+</a>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item className={classes.chipContainerItem} xs={12}>
                            <Grid container spacing={1}>
                                {skills && skills.map(item =>
                                    <Grid item>
                                        <Chip label={item} />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item className={classes.input} xs={12}>
                    <Grid item xs={12}>
                        <h2 className={classes.inputTitle}>Com quais nichos você trabalha?</h2>
                    </Grid>
                    <Grid container item className={classes.inputSkillsContainer}>
                        <Grid item>
                            <input value={niche} onKeyDown={(event) => { if (event.keyCode === 13){ event.preventDefault();handleSubmitNiche()}}} onChange={handleNicheChange} className={classes.inputSkills} />
                        </Grid>
                        <Grid item>
                            <a className={classes.addSkills} onClick={handleSubmitNiche}>+</a>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item className={classes.chipContainerItem} xs={12}>
                            <Grid container spacing={1}>
                                {niches && niches.map(item =>
                                    <Grid item>
                                        <Chip label={item} onDelete={handleDeleteNiche(item)}/>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
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