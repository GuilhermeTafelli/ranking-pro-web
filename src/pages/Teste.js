import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import CustomMenu from '../components/customMenu/CustomMenu';

import DepositionImage from '../static/depositions.jpg'
import { useDispatch } from 'react-redux'
import HomeImage from '../static/home.png'

const useStyles = makeStyles((theme) => ({
    main: {
        background: "#F5F6FA",
        flexDirection: "column",
        alignItems: "center"
    },
    rankingTitle: {
        [theme.breakpoints.down("md")]: {
            fontSize: "60px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "60px",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "35px",
        },
        marginTop: "20px",
        fontSize: "80px",
        fontFamily: "branding-bold",
        color: "#244CF4",
        textAlign: "center"
    },
    depositionsTitle: {
        [theme.breakpoints.down("md")]: {
            fontSize: "60px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "60px",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "30px",
        },
        margin: "50px 0px",
        fontSize: "45px",
        fontFamily: "branding-bold",
        textAlign: "center"
    },
    depositionsContainer: {
        alignItems: "center",
        flexDirection: "column",
        padding: "0px 10px",
    },
    depositionsItem: {
        background: "#FFF",
        borderRadius: "32px",
        padding: "30px 100px 30px 30px",
        margin: "15px 0px",
        boxShadow: "0 0 1em rgba(0, 0, 0, 0.09)",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",

        },

    },
    depositionsItemName: {
        fontSize: "34px",
        fontFamily: "branding-bold",
        color: "#244CF4",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        },
    },
    depositionsItemImage: {
        borderRadius: "25px",
        height: "130px",
        width: "130px",
        marginRight: "25px",
        [theme.breakpoints.down("sm")]: {
            marginRight: "0px",
        },
    },
    depositionsItemDescription: {
        fontFamily: "branding-medium",
        fontSize: "23px",
        textAlign: "justify"
    },
    depositionTextContainer: {
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center"
        },
    },
    rankingContainer: {
        alignItems: "center",
        flexDirection: "column",
        padding: "0px 10px"
    },
    rankingItem: {
        padding: "0px 20px",
        [theme.breakpoints.down("sm")]: {
            paddingRight: "0px",
        },
        backgroundColor: "#FFF",
        margin: "30px 0px",
        borderRadius: "30px",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "7px 7px 1em rgba(0, 0, 0, 0.2)",
    },
    rankingPosition: {
        fontSize: "28px",
        fontFamily: "branding-medium",
        color: "#3052DE"
    },
    rankingItemName: {
        fontSize: "18px",
        fontFamily: "branding-medium",
        color: "#373737"
    },
    rankingItemNameContainer: {
        margin: "0px 20px",
        alignSelf: "flex-start"
    },
    rankingItemLocation: {
        fontSize: "13px",
        fontFamily: "branding-light",
        color: "#373737"
    },
    rankingItemTitle: {
        fontSize: "13px",
        fontFamily: "branding-medium",
        color: "#FFFFFF",
        textAlign: "center"
    },
    rankingItemRevenuesText: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
        },
        fontSize: "40px",
        fontFamily: "branding-bold",
        color: "#FFFFFF",
        textAlign: "center"
    },
    rankingItemRevenuesContainer: {
        background: "transparent linear-gradient(301deg, #16FF67 0%, #23CDD9 100%) 0% 0% no-repeat padding-box",
        [theme.breakpoints.down("xs")]: {
            padding: "2px 10px",
        },
        padding: "2px 20px",
        borderRadius: "31px",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
            flexGrow: 1,
        },
    },
    infosContainer: {
        margin: "0px 10px",
    },
    rankingItemInfoTitle: {
        fontSize: "8px",
        fontFamily: "branding-medium",
        color: "#373737",
        textAlign: "center"
    },
    rankingItemInfoText: {
        fontSize: "30px",
        fontFamily: "branding-bold",
        color: "#373737",
        textAlign: "center"
    },
    rankingListContainer: {
        background: "#FFF",
        padding: "20px 20px 50px 20px",
        borderRadius: "30px",
        marginTop: "30px",
        marginBottom: "20px",
        overflowY: "auto",
        justifyContent: "center"
    },
    sectionDesktop: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        flexGrow: 1,
        width: "20%"
    },
    rankingList: {
        listStyleType: "none",
        width: "100%",
        marginBottom: "30px"
    },
    itemInfos: {
        flexGrow: 1,
        width: "20%"

    },
    sectionDesktopContainer: {
        justifyContent: "flex-end",
    },
    profilePhoto: {
        height: "45px",
        width: "65px",
        borderRadius: "57px",
        marginLeft: "20px",
        marginBottom: "0px",
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
    },
    itemInfosContainer: {
        alignItems: "center"
    },
    item: {
        padding: "0px",
        margin: "0px"
    },
    submit: {
        fontFamily: "branding-bold",
        fontSize: "30px",
        color: "#FFF",
        backgroundImage: "linear-gradient(#4E95FF, #0D2DFF)",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none",
        [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
        },
    },
    homeContainer: {
        height: "91vh",
        background: "#FFF",
        padding: "40px 70px",
        [theme.breakpoints.down("xs")]: {
            padding: "20px 30px",
            flexDirection: "row-reverse"
        },
    },
    homeContainerItem: {
        alignItems: "center",
        flexDirection: "column"
    },
    welcomeTitle: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "35px",
        },
        fontFamily: "branding-bold",
        fontSize: "85px",
        color: "#4B4B4B",
        lineHeight: "90%"
    },
    welcomeSubTitle: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
        },
        fontFamily: "branding-bold",
        fontSize: "30px",
        color: "#4B4B4B",
    },
    studentsText: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
        },
        marginTop: "30px",
        fontFamily: "branding-medium",
        fontSize: "25px",
        color: "#4B4B4B",
    },
    studentsStrong: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "28px",
        },
        fontFamily: "branding-bold",
        fontSize: "35px",
        color: "#244CF4",
    },
    invoicing: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "37px",
        },
        fontFamily: "branding-bold",
        fontSize: "65px",
        color: "#244CF4",
    },
    homeImage: {
        height: "100%",
        width: "100%",
        marginTop: "-90px"
    },
    homeTextContainer: {
        paddingTop: "20px",
        alignContent: "flex-start"
    },
    submitClean: {
        fontFamily: "branding-semibold",
        fontSize: "30px",
        color: "#FFF",
        background: "#4B4B4B",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none"
    },
    submitCleanContainer: {
        marginTop: "70px"
    }
}))

export default function Teste() {
    const [count, setCount] = useState(0);

    // // Similar ao componentDidMount e componentDidUpdate:
    // useEffect(() => {
    //     // Atualiza o titulo do documento usando a API do browser
    //     document.title = `Você clicou ${count} vezes`;
    // });

    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles()
    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/socials-media/ranking")
        console.log(response.data.socialsMedia.slice(0, 5))
        await new Promise((resolve) => setTimeout(resolve, 500))
        setContent(response.data.socialsMedia.slice(0, 5))
        console.log("1")
        setLoading(false)
        console.log("2")
    }, []);


    function formatMonthlyInvoicing(value) {
        console.log("3")
        return "R$ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        console.log("4")
    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>


            {/* <CustomMenu /> */}
            {content && <Grid container className={classes.main} xs={12}>
                <Grid container className={classes.homeContainer} >
                    <Grid item xs={12} md={5} className={classes.homeTextContainer}>
                        <Grid item xs={12}>
                            <h2 className={classes.welcomeSubTitle}>Bem-vinda(o) à</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <h1 className={classes.welcomeTitle}>Maior plataforma de social media do Mundo</h1>
                        </Grid>
                        <Grid item className={classes.submitCleanContainer}>
                            <a href="/signUp" className={classes.submit}>Faça parte agora!</a>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <img className={classes.homeImage} src={HomeImage} />
                    </Grid>

                </Grid>
                <Grid item container className={classes.rankingContainer}>
                    <Grid item>
                        <h1 className={classes.rankingTitle}>Faça parte do nosso ranking</h1>
                    </Grid>
                    <Grid container item xs={12} md={10} lg={8}>
                        <Grid item container className={classes.rankingListContainer} xs={12}>
                            <ul className={classes.rankingList} xs={12}>
                                {content && content.map((item) =>
                                    <li >
                                        <Grid container className={classes.rankingItem}>
                                            <Grid item className={classes.itemInfos}>
                                                <Grid container className={classes.itemInfosContainer}>
                                                    <Grid item>
                                                        <h2 className={classes.rankingPosition}>{item.position}</h2>
                                                    </Grid>
                                                    <Grid item className={classes.item}>
                                                        <img className={classes.profilePhoto} src={item.profilePhotoLink} />
                                                    </Grid>
                                                    <Grid item className={classes.rankingItemNameContainer}>
                                                        <h3 className={classes.rankingItemName}>{item.fullName.split(" ")[0]}</h3>
                                                        <h4 className={classes.rankingItemLocation}>{item.city ? item.city : "-"}</h4>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.rankingItemRevenuesContainer}>
                                                <Grid item >
                                                    <h4 className={classes.rankingItemTitle}>Faturamento</h4>
                                                    <h2 className={classes.rankingItemRevenuesText}>{item.monthlyInvoicing ? formatMonthlyInvoicing(item.monthlyInvoicing) : "-"}</h2>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.sectionDesktop}>
                                                <Grid container className={classes.sectionDesktopContainer}>
                                                    <Grid item className={classes.infosContainer}>
                                                        <h4 className={classes.rankingItemInfoTitle}>Clientes Ativos</h4>
                                                        <h2 className={classes.rankingItemInfoText}>{item.currentContracts ? item.currentContracts : "-"}</h2>
                                                    </Grid>
                                                    <Grid item className={classes.infosContainer}>
                                                        <h4 className={classes.rankingItemInfoTitle}>Trabalhos Feitos</h4>
                                                        <h2 className={classes.rankingItemInfoText}>{item.worksDone ? item.worksDone : "-"}</h2>
                                                    </Grid>
                                                    <Grid item className={classes.infosContainer}>
                                                        <h4 className={classes.rankingItemInfoTitle}>Medalhas</h4>
                                                        <h2 className={classes.rankingItemInfoText}>{item.medals ? item.medals : "-"}</h2>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </li>
                                )}
                            </ul>
                            <Grid item>
                                <a
                                    href="/signUp"
                                    type="submit"
                                    className={classes.submit}
                                >
                                    Quero fazer parte
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container className={classes.depositionsContainer} xs={10}>
                    <Grid item>
                        <h1 className={classes.depositionsTitle}>Veja os comentários dos nossos alunos</h1>
                    </Grid>
                    <Grid container item className={classes.depositionsItem}>
                        <Grid item>
                            <img className={classes.depositionsItemImage} src={DepositionImage} />
                        </Grid>
                        <Grid container className={classes.depositionTextContainer} xs={12} md={10}>
                            <h2 className={classes.depositionsItemName}>@João silva</h2>
                            <p className={classes.depositionsItemDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </Grid>
                    </Grid>
                    <Grid container item className={classes.depositionsItem}>
                        <Grid item>
                            <img className={classes.depositionsItemImage} src={DepositionImage} />
                        </Grid>
                        <Grid container className={classes.depositionTextContainer} xs={12} md={10}>
                            <h2 className={classes.depositionsItemName}>@João silva</h2>
                            <p className={classes.depositionsItemDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </Grid>
                    </Grid>
                    <Grid container item className={classes.depositionsItem}>
                        <Grid item>
                            <img className={classes.depositionsItemImage} src={DepositionImage} />
                        </Grid>
                        <Grid container className={classes.depositionTextContainer} xs={12} md={10}>
                            <h2 className={classes.depositionsItemName}>@João silva</h2>
                            <p className={classes.depositionsItemDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>}
        </React.Fragment>
    );
}
