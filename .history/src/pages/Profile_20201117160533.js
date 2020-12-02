import React, { useState, useEffect } from  'react'
import { Grid } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer';
import RegisterOnEventForm from '../components/RegisterOnEventForm';
import CustomMenu from '../components/CustomMenu'
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FileInput from '../components/input/FileInput'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import { ReactComponent as BronzeMedalIcon } from '../static/teste.svg';
import { ReactComponent as SilverMedalIcon } from '../static/silver-medal.svg';
import { ReactComponent as GoldMedalIcon } from '../static/gold-medal.svg';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../services/Api'
const useStyles = makeStyles((theme) => ({
    container: {
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
    profilePhotoContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        alignItems: 'center'
    },

    profileDescriptionContainer:{
        padding: "10px",
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        height: "100%",
        alignItems: 'flex-start',
        justifyContent: "flex-start"
    },
    profileContainerItem: {
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        marginBottom: '10px',
    },
    profilDescriptionContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        padding: "20px"
    },
    profilDescriptionContainerItem: {
        backgroundColor: "#FFFFFF",
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
    profileItem2: {
        backgroundColor: "#FFFFFF",
        marginRight: "10px",
        marginLeft: "10px",
        marginBottom: "15px",
        borderRadius: "6px",
        [theme.breakpoints.up("449")]: {
            flexGrow: "1",
        },
        [theme.breakpoints.down("450")]: {
            width: "100%",
        },
        padding: "10px"
    },
    profilePhotoItem: {
      backgroundColor: "#FFFFFF",
      justifyContent: 'center',
    },
    avatar: {
        width: "230px",
        height: "230px",
        marginTop: "20px",
        marginBottom: "20px",
        [theme.breakpoints.up("sm")]: {
            width: "230px",
            height: "230px"
        },
    },
    skillsItem:{
        spacing: theme.spacing(1)
    },
    nameTitleTypography:{
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center"
    },
    socialMediaTitleTypography:{
        fontSize: "20px",
        textAlign: "center",
        marginTop: "-7px"
    },
    itemBodyTypography:{
        fontSize: "16px",
        textAlign: "justify",
        marginBottom: "10px"

    },
    itemTitleTypography: {
        fontWeight: "bold",
        fontSize: "24px",
        marginBottom: "10px"
    },
    itemSubTitleTypography: {
        fontWeight: "bold",
        fontSize: "20px",
        marginBottom: "5px",
        marginRight: "5px"
    },
    medalsItemBodyTypography: {
        fontSize: "13px",
        textAlign: "center"
    },
    profilDescriptionSocialNetworksButtonItem: {
        marginTop: "25px",
        
    },
    profilDescriptionSocialNetworksButtonContainerItem:{
        marginTop: "25px"
    },

    profilDescriptionSocialNetworksButtonContainer: {
        marginTop: "5px",
    },
    socialNetworksButton: {
        textTransform: "none",
        fullWidth: true,
        size: "large",


    },
    medalsContainerItem: {
        justifyContent: "center",
        padding: "10px"
    }
}));

export default function Profile() {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const response =  await api.get("/users/socials-media/f78c7692-e028-4539-8c51-c23e44885634")
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data)
        await setLoading(false)
    });

    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline/>
            <CustomMenu/>

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {content && <Grid container className={classes.container}>
                <Grid container className={classes.profileContainer} xs={12} md={8} >
                    <Grid item  className={classes.mainItemContainer} xs={12} lg={3}>
                        <Grid container>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilePhotoContainer}>
                                    <Avatar className={classes.avatar} id="avatar" src={content.profilePhotoLink ? content.profilePhotoLink : ""}/>
                                    <Typography className={classes.nameTitleTypography}>{content.name+" "+content.surname}</Typography>
                                    <Typography className={classes.socialMediaTitleTypography}>Social Media</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.mainItemContainer} xs={12} lg={8}>
                        <Grid container  lg={12}>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.itemTitleTypography}>Sobre mim</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                    <   Typography className={classes.itemBodyTypography}>{content.aboutMe}</Typography>
                                    </Grid>
                                
                                </Grid>
                           </Grid>
                           <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>Cidade</Typography>
                                        <Typography className={classes.itemBodyTypography}>{content.city+"/"+content.state}</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>Idade</Typography>
                                        <Typography className={classes.itemBodyTypography}>{content.age+" anos"}</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>Telefone</Typography>
                                        <Typography className={classes.itemBodyTypography}>{content.phone}</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>WhatsApp</Typography>
                                        <Typography className={classes.itemBodyTypography}>{content.whatsApp}</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionSocialNetworksButtonContainerItem} xs={12}>
                                        <Typography className={classes.itemSubTitleTypography}>Redes Sociais</Typography>

                                        <Grid container spacing={2} className={classes.profilDescriptionSocialNetworksButtonContainer} >
                                        <Grid item xs={6} sm={3}>
                                                {content.instagram  && <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    size="large"
                                                    variant="contained"
                                                    fullWidth
                                                    color="default"
                                                    onClick={() => {window.open(content.instagram)}}
                                                    startIcon={<InstagramIcon />}
                                                    >
                                                        Instagram
                                                </Button>
                                                }   
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                {content.facebook  && <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    size="large"
                                                    variant="contained"
                                                    fullWidth
                                                    color="default"
                                                    onClick={() => {window.open(content.facebook)}}
                                                    startIcon={<FacebookIcon />}
                                                    >
                                                        Facebook
                                                </Button>
                                                }   
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                {content.youtube  && <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    size="large"
                                                    variant="contained"
                                                    fullWidth
                                                    color="default"
                                                    onClick={() => {window.open(content.youtube)}}
                                                    startIcon={<YouTubeIcon />}
                                                    >
                                                        Youtube
                                                </Button>
                                                }   
                                            </Grid>
                                            <Grid item xs={6} sm={3}>
                                                {content.linkedin  && <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    size="large"
                                                    variant="contained"
                                                    fullWidth
                                                    color="default"
                                                    onClick={() => {window.open(content.linkedin)}}
                                                    startIcon={<LinkedInIcon />}
                                                    >
                                                        Facebook
                                                </Button>
                                                }   
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                           </Grid>
                           <Grid item className={classes.profileItem2}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Typography className={classes.itemSubTitleTypography}>Faturamento mensal: </Typography>
                                    <Typography className={classes.itemSubTitleTypography}>{"R$ "+content.monthlyInvoicing} </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.profileItem2}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Typography className={classes.itemSubTitleTypography}>Cliente ativos:</Typography>
                                    <Typography className={classes.itemSubTitleTypography}>{content.currentContracts}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.itemTitleTypography}>Medalhas</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4} lg={2}>
                                                <Grid container className={classes.medalsContainerItem}>
                                                    <GoldMedalIcon/>
                                                    <Grid item xs={12}>
                                                        <Typography className={classes.medalsItemBodyTypography}>Faturamento acima de 3 mil</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4} lg={2}>
                                                <Grid container className={classes.medalsContainerItem}>
                                                    <SilverMedalIcon/>
                                                    <Grid item xs={12}>
                                                        <Typography className={classes.medalsItemBodyTypography}>Faturamento acima de 3 mil</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4} lg={2}>
                                                <Grid container className={classes.medalsContainerItem}>
                                                    <BronzeMedalIcon/>
                                                    <Grid item xs={12}>
                                                        <Typography className={classes.medalsItemBodyTypography}>Faturamento acima de 3 mil</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4} lg={2}>
                                                <Grid container className={classes.medalsContainerItem}>
                                                    <GoldMedalIcon/>
                                                    <Grid item xs={12}>
                                                        <Typography className={classes.medalsItemBodyTypography}>Faturamento acima de 3 mil</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                           </Grid>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.itemTitleTypography}>Skills</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2}>
                                            {content.skills.map(item => 
                                                <Grid item>
                                                    <Chip icon={<FaceIcon />} label={item}/>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                           </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        }     
        </React.Fragment>
    )
}