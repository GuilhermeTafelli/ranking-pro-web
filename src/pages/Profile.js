import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2';
import api from '../services/Api'
import LocationIcon from '../static/location.svg'
import EmailIcon from '../static/email.svg'
import InstagramIcon from '../static/instagram.svg'
import FacebookIcon from '../static/facebook.svg'
import LinkedInIcon from '../static/linkedin.svg'
import YoutubeIcon from '../static/youtube.svg'
import TikTokIcon from '../static/tiktok.svg'
import TwitterIcon from '../static/twitter.svg'
import WhatsAppIcon from '../static/whatsapp.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import AgeIcon from '../static/age.svg'
import { useParams } from 'react-router-dom';
import { ReactComponent as MedalOutline } from '../static/medals/medal-outline.svg'
import Medal3Revenues from '../static/medals/medal-3-revenues.svg'
import Medal5Revenues from '../static/medals/medal-5-revenues.svg'
import Medal10Revenues from '../static/medals/medal-10-revenues.svg'
import Medal20Revenues from '../static/medals/medal-20-revenues.svg'
import Medal30Revenues from '../static/medals/medal-30-revenues.svg'
import MedalFirstContract from '../static/medals/medal-first-contract.svg'
import MedalFirstPartner from '../static/medals/medal-first-partner.svg'
import MedalFirstVideoFeedback from '../static/medals/medal-first-video-feedback.svg'
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector } from 'react-redux'

import CustomMenu from '../components/customMenu/CustomMenu';

const useStyles = makeStyles((theme) => ({
    main: {
        background: "#F5F6FA",
        minHeight: "93vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            padding: "10px"
        },
    },
    mainContainer: {
        alignItems: "flex-start"
    },
    profileContainer: {
        padding: "20px",
    },
    profileItem: {
        background: "#FFF",
        borderRadius: "30px",
        margin: "5px",
        padding: "25px"
    },
    containerProfilePhoto: {
        justifyContent: "center"
    },
    name: {
        fontSize: "32px",
        fontFamily: "branding-semibold",
        color: "#3156E1",
        textAlign: "center",
        marginTop: "10px"
    },
    socialMedia: {
        fontSize: "20px",
        fontFamily: "branding-medium",
        color: "#373737",
        textAlign: "center"
    },
    profilePhoto: {
        height: "180px",
        width: "180px",
        borderRadius: "30px"
    },
    aboutMe: {
        fontSize: "17px",
        fontFamily: "branding-medium",
        color: "#373737",
        textAlign: "justify",
        margin: "30px 0px"
    },
    title: {
        fontSize: "22px",
        fontFamily: "branding-bold",
        color: "#373737",
    },
    cardItem: {
        padding: "5px"
    },
    cardPosition: {
        background: "#FFF",
        borderRadius: "30px",
        padding: "10px 20px",
    },
    cardPositionTitle: {
        fontSize: "13px",
        fontFamily: "branding-medium",
        color: "#272727",
        textAlign: "center"
    },
    cardPositionValue: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "50px",
        },
        fontSize: "60px",
        fontFamily: "branding-bold",
        color: "#3052DE",
        textAlign: "center"
    },
    cardRevenues: {
        background: "transparent linear-gradient(290deg, #16FF67 0%, #23CDD9 100%) 0% 0% no-repeat padding-box",
        borderRadius: "30px",
        padding: "10px 20px",
    },
    cardRevenuesTitle: {
        fontSize: "13px",
        fontFamily: "branding-bold",
        color: "#FFF",
    },
    cardRevenuesValue: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        },
        fontSize: "60px",
        fontFamily: "branding-bold",
        color: "#FFF",
    },
    cardClients: {
        background: "transparent linear-gradient(193deg, #348CFF 0%, #7930D8 100%) 0% 0% no-repeat padding-box",
        borderRadius: "30px",
        padding: "10px 20px",
    },
    cardClientsTitle: {
        fontSize: "13px",
        fontFamily: "branding-medium",
        color: "#FFF",
        textAlign: "center"
    },
    cardClientsValue: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "50px",
        },
        fontSize: "60px",
        fontFamily: "branding-bold",
        color: "#FFFF",
        textAlign: "center"
    },
    cardWorks: {
        background: "transparent linear-gradient(198deg, #484848 0%, #292828 100%) 0% 0% no-repeat padding-box",
        borderRadius: "30px",
        padding: "10px 20px"
    },
    cardWorksTitle: {
        fontSize: "13px",
        fontFamily: "branding-medium",
        color: "#FFF",
        textAlign: "center"
    },
    cardWorksValue: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "50px",
        },
        fontSize: "60px",
        fontFamily: "branding-bold",
        color: "#FFFF",
        textAlign: "center"
    },
    chipContainerItem: {
        marginTop: "20px"
    },
    infromationText: {
        marginLeft: "5px",
        fontSize: "15px",
        fontFamily: "branding-medium",
        color: "#373737",
    },
    containerItemInformation: {
        padding: "8px 1px",
        alignItems: "center",
    },
    socialNetworkContainer: {
        marginTop: "10px"
    },
    containerInformation: {
        marginTop: "10px",
        marginBottom: "15px"
    },
}));

const content = {
    skills: ["Bom", "Bonito", "Barato"]
}

export default function Profile() {
    const classes = useStyles();
    const state = useSelector(state => state.socialMedia)
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const { socialMediaId } = useParams();
    const [dataDash, setDataDash] = useState(null)

    useEffect(async () => {

        
        setLoading(true)
        
        const response = await api.get("/users/socials-media/" + socialMediaId)
        
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        const data = {
            labels: ["Dez"],
            datasets: [
                {
                    backgroundColor: '#3052DE',
                    data: [response.data.monthlyInvoicing]
                }
            ]
        };
        
        setDataDash(data)
        
        await setContent(response.data)
        await setLoading(false)
    }, []);

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomMenu />
            {content && <div className={classes.main}>
                <Grid container className={classes.mainContainer} md={10}>
                    <Grid item className={classes.profileContainer} md={3}>
                        <Grid container className={classes.profileItem}>
                            <Grid container item className={classes.containerProfilePhoto}>
                                <Grid item>
                                    <img className={classes.profilePhoto} src={content.profilePhotoLink}></img>
                                </Grid>
                                <Grid item xs={12}>
                                    <h2 className={classes.name}>{content.fullName}</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <h3 className={classes.socialMedia}>Social Media</h3>
                                </Grid>

                            </Grid>
                            <Grid item xs={12}>
                                <p className={classes.aboutMe}>{content.aboutMe}</p>
                            </Grid>
                            <h3 className={classes.title}>Informações</h3>
                            <Grid container item className={classes.containerInformation}>
                                <Grid container className={classes.containerItemInformation} xs={6}>
                                    <img src={AgeIcon}/>
                                    <p className={classes.infromationText}>{content.age} anos</p>
                                </Grid>
                                <Grid container className={classes.containerItemInformation} xs={6}>
                                    <img src={LocationIcon} />
                                    <p className={classes.infromationText}>{content.city}</p>
                                </Grid>
                                <Grid container className={classes.containerItemInformation} xs={12}>
                                    <img src={EmailIcon} />
                                    <p className={classes.infromationText}>{content.email}</p>
                                </Grid>
                            </Grid>
                            <h3 className={classes.title}>Redes Sociais</h3>
                            <Grid container className={classes.socialNetworkContainer} spacing={1}>
                                {content.facebook && <Grid item>
                                    <a target="_blank" rel="external" href={content.facebook}><img src={FacebookIcon} /></a>
                                </Grid>}
                                {content.instagram && <Grid item>
                                    <a target="_blank" rel="external" href={content.instagram}><img src={InstagramIcon} /></a>
                                </Grid>}
                                {content.whatsApp && <Grid item>
                                    <a target="_blank" rel="external" href={content.whatsApp}><img src={WhatsAppIcon} /></a>
                                </Grid>}
                                {content.linkedIn && <Grid item>
                                    <a target="_blank" rel="external" href={content.linkedIn}><img src={LinkedInIcon} /></a>
                                </Grid>}
                                {content.twitter && <Grid item>
                                    <a target="_blank" rel="external" href={content.twitter}><img src={TwitterIcon} /></a>
                                </Grid>}
                                {content.tikTok && <Grid item>
                                    <a target="_blank" rel="external" href={content.tikTok}><img src={TikTokIcon} /></a>
                                </Grid>}
                                {content.youTube && <Grid item>
                                    <a target="_blank" rel="external" href={content.youTube}><img src={YoutubeIcon} /></a>
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item className={classes.profileContainer} md={5}>
                        <Grid container className={classes.cardItem} xs={4}>
                            <Grid item className={classes.cardPosition} xs={12}>
                                <h3 className={classes.cardPositionTitle}>Posição</h3>
                                <h4 className={classes.cardPositionValue}>{state.position ? state.position : "-"}</h4>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.cardItem} xs={4}>
                            <Grid item className={classes.cardClients} xs={12}>
                                <h3 className={classes.cardClientsTitle}>Clientes</h3>
                                <h4 className={classes.cardClientsValue}>{content.customers ? content.customers : "-"}</h4>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.cardItem} xs={4}>
                            <Grid item className={classes.cardWorks} xs={12}>
                                <h3 className={classes.cardWorksTitle}>Clientes em teste</h3>
                                <h4 className={classes.cardWorksValue}>{content.testCustomers ? content.testCustomers : "-"}</h4>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className={classes.profileItem}>
                            <Grid item xs={12}>
                                <h3 className={classes.title}>Medalhas</h3>
                            </Grid>
                            <Tooltip title="Primeiro cliente em teste" aria-label="primeiro clientes em teste">
                                {content.medals && content.medals.includes("MEDAL_FIRST_CUSTOMER_TEST")
                                    ?
                                    <Grid item>
                                        <img src={MedalFirstPartner} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Primeiro contrato" aria-label="Primeiro contrato">
                                {content.medals && content.medals.includes("MEDAL_FIRST_CONTRACT")
                                    ?
                                    <Grid item>
                                        <img src={MedalFirstContract} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Primeiro feedback em video" aria-label="Primeiro feedback em video">
                                {content.medals && content.medals.includes("MEDAL_FIRST_VIDEO_FEEDBACK")
                                    ?
                                    <Grid item>
                                        <img src={MedalFirstVideoFeedback} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Faturamento acima de 3 mil" aria-label="Faturamento acima de 3 mil">
                                {content.medals && content.medals.includes("MEDAL_3_REVENUES")
                                    ?
                                    <Grid item>
                                        <img src={Medal3Revenues} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Faturamento acima de 5 mil" aria-label="Faturamento acima de 5 mil">
                                {content.medals && content.medals.includes("MEDAL_5_REVENUES")
                                    ?
                                    <Grid item>
                                        <img src={Medal5Revenues} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Faturamento acima de 10 mil" aria-label="Faturamento acima de 10 mil">
                                {content.medals && content.medals.includes("MEDAL_10_REVENUES")
                                    ?
                                    <Grid item>
                                        <img src={Medal10Revenues} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Faturamento acima de 20 mil" aria-label="Faturamento acima de 20 mil">
                                {content.medals && content.medals.includes("MEDAL_20_REVENUES")
                                    ?
                                    <Grid item>
                                        <img src={Medal20Revenues} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                            <Tooltip title="Faturamento acima de 30 mil" aria-label="Faturamento acima de 30 mil">

                                {content.medals && content.medals.includes("MEDAL_30_REVENUES")
                                    ?
                                    <Grid item>
                                        <img src={Medal30Revenues} />
                                    </Grid>
                                    :
                                    <Grid item>
                                        <MedalOutline />
                                    </Grid>
                                }
                            </Tooltip>
                        </Grid>
                        <Grid container className={classes.cardItem} xs={12}>
                            <Grid item className={classes.cardRevenues} xs={12}>
                                <h3 className={classes.cardRevenuesTitle}>Faturamento</h3>
                                <h4 className={classes.cardRevenuesValue}>{content.monthlyInvoicing ? "R$" + content.monthlyInvoicing.toFixed(2) : "-"}</h4>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.profileItem}>
                            <Grid item xs={12}>
                                <h3 className={classes.title}>Média de Faturamento</h3>
                            </Grid>
                            <Bar
                                data={dataDash}
                                width={100}

                                options={{
                                    scaleLabel: {
                                        fontSize: 32
                                    },
                                    responsive: true,
                                    legend: {
                                        display: false
                                    },
                                    tooltips: {
                                        enabled: false
                                    },
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                display: false
                                            },
                                            ticks: {
                                                display: true,
                                                fontFamily: "branding-medium",
                                                fontColoe: "#373737"
                                            },
                                        }],
                                        yAxes: [{
                                            gridLines: {
                                                display: true,
                                                drawBorder: false
                                            },
                                            ticks: {
                                                display: false
                                            },

                                        }],
                                        ticks: {
                                            display: false
                                        }
                                    },
                                    maintainAspectRatio: false,

                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item className={classes.profileContainer} md={4}>
                        {/* <Grid container className={classes.profileItem}>
                            <Grid item xs={12}>
                                <h3 className={classes.title}>Avaliações</h3>
                            </Grid>
                        </Grid> */}
                        <Grid container className={classes.profileItem}>
                            <Grid item xs={12}>
                                <h3 className={classes.title}>Nichos</h3>
                            </Grid>
                            <Grid item className={classes.chipContainerItem} xs={12}>
                                <Grid container spacing={1}>
                                    {content.niches && content.niches.map(item =>
                                        <Grid item>
                                            <Chip label={item} />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.profileItem}>
                            <Grid item xs={12}>
                                <h3 className={classes.title}>Habilidades</h3>
                            </Grid>
                            <Grid item className={classes.chipContainerItem} xs={12}>
                                <Grid container spacing={1}>
                                    {content.skills && content.skills.map(item =>
                                        <Grid item>
                                            <Chip label={item} />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>}
        </React.Fragment>
    );
}