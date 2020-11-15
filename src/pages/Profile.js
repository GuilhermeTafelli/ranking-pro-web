import React, { useState } from  'react'
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

const useStyles = makeStyles((theme) => ({
    container: {
      marginBottom: theme.spacing(8),
      flexDirection: 'row',
      backgroundColor: "#BEB6AE",
      justifyContent: 'center',
    },
    banner: {
        height: '15vh', 
        width: '100vw',
        backgroundColor: "#FFFFFF"
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
        borderRadius: "6px",
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
    profilDescriptionSocialNetworksButtonItem: {
        marginTop: "25px",
        
    },
    profilDescriptionSocialNetworksButtonContainer: {
        justifyContent: "space-between",
        marginTop: "10px"
    },
    socialNetworksButton: {
        textTransform: "none",
        fullWidth: true
    }
}));

export default function Profile() {

    const [file, setFile] = useState(null);


    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid container className={classes.container}>
                <Grid container className={classes.profileContainer} xs={12} lg={8} >
                    <Grid item  className={classes.mainItemContainer} xs={12} lg={3}>
                        <Grid container>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilePhotoContainer}>
                                    <Avatar className={classes.avatar} id="avatar" src="https://ranking-pro-files.s3-sa-east-1.amazonaws.com/profile-photo-Joao-cc8736ee9dc3b41d"/>
                                    <Typography className={classes.nameTitleTypography}>Guilherme Tafelli</Typography>
                                    <Typography className={classes.socialMediaTitleTypography}>Social Media</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.mainItemContainer} xs={12} lg={8}>
                        <Grid container  lg={12}>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                <Typography className={classes.itemTitleTypography}>Sobre mim</Typography>
                                <Typography className={classes.itemBodyTypography}>Meu nome é Guilherme Tafelli, tenho 19 anos e sou social media a mais de um ano. Aprendi tudo com a maior gestora de social media do Brasil. Hoje vivo disso e sustento minha familia.</Typography>
                                
                                </Grid>
                           </Grid>
                           <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>Cidade</Typography>
                                        <Typography className={classes.itemBodyTypography}>Uberlândia/MG</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>Idade</Typography>
                                        <Typography className={classes.itemBodyTypography}>19 anos</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>Telefone</Typography>
                                        <Typography className={classes.itemBodyTypography}>(34) 99669-9548</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionContainerItem} xs={12} sm={4} lg={3}>
                                        <Typography className={classes.itemSubTitleTypography}>WhatsApp</Typography>
                                        <Typography className={classes.itemBodyTypography}>(34) 99669-9548</Typography>
                                    </Grid>
                                    <Grid item className={classes.profilDescriptionSocialNetworksButtonContainerItem} xs={12}>
                                        <Typography className={classes.itemSubTitleTypography}>Redes Sociais</Typography>

                                        <Grid container spacing={2} className={classes.profilDescriptionSocialNetworksButtonContainer} >
                                            <Grid item xs={6} sm={2}>
                                                <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    fullWidth
                                                    variant="contained"
                                                    color="default"
                                                    startIcon={<InstagramIcon />}
                                                    >
                                                        Instagram
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6} sm={2}>
                                                <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    fullWidth
                                                    variant="contained"
                                                    color="default"
                                                    startIcon={<FacebookIcon />}
                                                    >
                                                        Facebook
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6} sm={2}>
                                                <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    fullWidth
                                                    variant="contained"
                                                    color="default"
                                                    startIcon={<YouTubeIcon />}
                                                    >
                                                        YouTube
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6} sm={2}>
                                                <Button
                                                    className={classes.socialNetworksButton}
                                                    disableElevation
                                                    fullWidth
                                                    variant="contained"
                                                    color="default"
                                                    startIcon={<LinkedInIcon />}
                                                    >
                                                        LinkedIn
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                           </Grid>
                           <Grid item className={classes.profileItem2}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Typography className={classes.itemSubTitleTypography}>Faturamento mensal: </Typography>
                                    <Typography className={classes.itemSubTitleTypography}>R$ 3000,00</Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.profileItem2}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Typography className={classes.itemSubTitleTypography}>Cliente ativos:</Typography>
                                    <Typography className={classes.itemSubTitleTypography}>2</Typography>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.profileItem} xs={12} lg={12}>
                                <Grid container className={classes.profilDescriptionContainer}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.itemTitleTypography}>Skills</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Copy"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                            <Grid item>
                                                <Chip icon={<FaceIcon />} label="Comunicação"/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                           </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}