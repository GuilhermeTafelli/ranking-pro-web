import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import CustomMenu from '../components/customMenu/CustomMenu'
import history from '../history'
import { useParams } from 'react-router-dom';
import Image from '../static/depositions/depositions.jpg'
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

const useStyles = makeStyles((theme) => ({
    main: {
        justifyContent: "center",
        background: "#F5F6FA",
        [theme.breakpoints.down("sm")]: {
            background: "#fafafa",
        },
        height: "100vh"

    },
    borderProfilePhoto: {
        background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
        padding: "2px",
        borderRadius: "100%",

    },
    profilePhoto: {
        borderRadius: "50%",
        width: "90px",
        height: "90px",
        verticalAlign: "middle",
        border: "2px solid #FFF",

    },
    profileItemTitle: {
        textAlign: "center",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 600,
        fontSize: "17px",
        color: "rgb(38, 38, 38)"
    },
    profileItemText: {
        textAlign: "center",
        fontSize: "11px",
        fontWeight: 400,
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        color: "rgb(38, 38, 38)",
    },
    itemsHead: {
        padding: "5px"
    },
    profileDescriptionContainer: {
        flexDirection: "column",
        paddingBottom: "20px"
    },
    mainContainer: {
        justifyContent: "flex-start",
        width: "320px",
        background: "#fafafa",
        padding: "10px 10px 10px 10px",
        borderRadius: "5px",
        height: "400px",
        marginTop: "40px",
    },
    following: {
        textAlign: "center",
        border: "1px solid rgba(var(--ca6,219,219,219),1)",
        padding: "9px",
        borderRadius: "4px",
        fontSize: "12px",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
    },
    button: {
        padding: "10px 10px 10px 0px",
        width: "50%",
    },
    buttons: {
        flexDirection: "row",
        marginTop: "5px"
    },
    storiesPhoto: {
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        verticalAlign: "middle",
        margin: "2px"
    },
    storiesTitle: {
        textAlign: "center",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        color: "rgb(38, 38, 38)",

    },
    storiesItems: {
        padding: "10px 15px 10px 0px",
        fontSize: "14px"
    },
    headContainer: {
        alignItems: "center",
        marginBottom: "15px"
    },
    borderStories: {
        borderRadius: "50%",
        border: "solid 0.1em #b4b4b4",
        paddingBottom: "0px"
    },
    name: {
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "rgb(38, 38, 38)"
    },
    accountType: {
        fontSize: "14px",
        color: "#979797",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 400,
    },
    bio: {
        fontSize: "16px",
        color: "rgb(38, 38, 38)",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 400,
    },
    photoContainer: {
        paddingTop: "10px",
        paddingRight: "10px"
    },
    download: {
        fontFamily: "branding-bold",
        fontSize: "20px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 15px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none",
        [theme.breakpoints.down("xs")]: {
            fontSize: "15px",
        },
    },
}))

export default function InstagramProfile() {

    const classes = useStyles()
    const [content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    var node = document.getElementById('profile');
    const componentRef = useRef();


    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/social-medias/instagram/simulations/" + id)
        await new Promise((resolve) => setTimeout(resolve, 500))
        const bio = response.data.bio.split("\n")
        response.data.bio = bio
        await setContent(response.data)
        await setLoading(false)
    }, []);

    const handleDownload = () => {
        ;
    }

    const ComponentToPrint = React.forwardRef((props, ref) => (
        <Grid ref={ref} item id="profile" className={classes.mainContainer}>
            <Grid container className={classes.headContainer}>
                <Grid item className={classes.photoContainer}>
                    <div className={classes.borderProfilePhoto}>
                        <img className={classes.profilePhoto} src={content.profilePhoto} />
                    </div>
                </Grid>
                <Grid item className={classes.itemsHead}>
                    <h2 className={classes.profileItemTitle}>{content.publications}</h2>
                    <h3 className={classes.profileItemText}>Publicações</h3>
                </Grid>
                <Grid item className={classes.itemsHead}>
                    <h2 className={classes.profileItemTitle}>{content.followers}</h2>
                    <h3 className={classes.profileItemText}>Seguidores</h3>
                </Grid>
                <Grid item className={classes.itemsHead}>
                    <h2 className={classes.profileItemTitle}>{content.following}</h2>
                    <h3 className={classes.profileItemText}>Seguindo</h3>
                </Grid>
            </Grid>
            <Grid container className={classes.profileDescriptionContainer}>
                <Grid item >
                    <h2 className={classes.name}>{content.profileName}</h2>
                </Grid>
                <Grid item >
                    <p className={classes.accountType}>{content.category}</p>
                </Grid>
                <Grid item >
                    {content.bio && content.bio.map(bioLine =>
                        <h2 className={classes.bio}>{bioLine}</h2>
                    )}
                </Grid>
                <Grid container item className={classes.buttons} xs={12}>
                    <span className={classes.button}>
                        <h2 className={classes.following}>Seguindo</h2>
                    </span>
                    <span className={classes.button}>
                        <h2 className={classes.following}>Mensagem</h2>
                    </span>
                </Grid>
                <Grid container item xs={12}>
                    {content.highlights && content.highlights.map(highlight => (
                        <Grid item className={classes.storiesItems}>
                            <div className={classes.borderStories}>
                                <img className={classes.storiesPhoto} src={highlight.image} />
                            </div>
                            <h4 className={classes.storiesTitle}>{highlight.title}</h4>
                        </Grid>
                    ))
                    }
                </Grid>

            </Grid>
            <Grid container className={classes.profileDescriptionContainer}>
{/* 
                <button className={classes.download} onClick={() => exportComponentAsPNG(componentRef)}>
                    Download
                    </button> */}
            </Grid>

        </Grid>
    ));

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomMenu />
            {content &&
                <Grid container className={classes.main} >
                    <ComponentToPrint ref={componentRef} />

                </Grid>
            }
        </React.Fragment>
    )
}