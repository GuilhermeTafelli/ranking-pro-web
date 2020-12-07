import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../services/Api'
import history from '../history'
import CustomMenu from '../components/customMenu/CustomMenu';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    main: {
        background: "#F5F6FA",
        flexDirection: "column",
    },
    rankingTitle: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "40px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "50px",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "60px",
        },
        fontSize: "80px",
        fontFamily: "branding-bold",
        color: "#244CF4",
        textAlign: "center"
    },
    rankingContainer: {
        alignItems: "center",
        flexDirection: "column",
        padding: "0px 10px"
    },
    rankingItem: {
        padding: "0px 20px",
        [theme.breakpoints.down("xs")]: {
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
        padding: "20px 20px",
        borderRadius: "30px",
        marginTop: "30px",
        marginBottom: "20px",
        overflowY: "auto",
    },
    sectionDesktop: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        flexGrow: 1,
        width: "20%"
    },
    rankingList: {
        listStyleType: "none",
        width: "100%"
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
        marginLeft: "10px",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.09)",
        textDecoration: "none"
    },
    homeContainer: {
        height: "92vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    homeContainerItem: {
        alignItems: "center",
        flexDirection: "column"
    },
    welcomeTitle: {
        fontFamily: "branding-bold",
        fontSize: "140px",
        color: "#0B38F2",
        textAlign: "center"
    },
    welcomeSubTitle: {
        fontFamily: "branding-bold",
        fontSize: "70px",
        color: "#4B4B4B",
        textAlign: "center",
        marginTop: "-15px"
    },
    studentsText: {
        marginTop: "60px",
        fontFamily: "branding-medium",
        fontSize: "35px",
        color: "#4B4B4B",
        textAlign: "center"
    },
    studentsStrong: {
        fontFamily: "branding-bold",
        fontSize: "55px",
        color: "#244CF4",
        textAlign: "center"
    },
    invoicing: {
        fontFamily: "branding-bold",
        fontSize: "130px",
        color: "#244CF4",
        textAlign: "center"
    }
}))

export default function Home() {

    const classes = useStyles()

    const [content, setContent] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/socials-media/ranking")
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data.socialsMedia.slice(0, 5))
        await setLoading(false)
    }, []);

    function formatMonthlyInvoicing(value) {
        return "R$ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {content && <CustomMenu />}
            {content && <Grid container className={classes.main} xs={12}>
                <Grid container item className={classes.homeContainer} >
                    <Grid container className={classes.homeContainerItem}>
                        <Grid item md={5}>
                            <h1 className={classes.welcomeTitle}>Bem-vindo</h1>
                        </Grid>
                        <Grid item md={4}>
                            <h2 className={classes.welcomeSubTitle}> a maior plataforma de social media</h2>
                        </Grid>
                        <Grid item>
                        <h3 className={classes.studentsText}> Nossos <strong className={classes.studentsStrong}>2.000 alunos</strong> já faturaram</h3>
                        </Grid>
                        <Grid item>
                        <h1 className={classes.invoicing}>R$ 300,000,00</h1>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container className={classes.rankingContainer}>
                    <Grid item>
                        <h1 className={classes.rankingTitle}>Faça parte do nosso ranking</h1>
                    </Grid>
                    <Grid container item xs={12} md={10} lg={8}>
                        <Grid item container className={classes.rankingListContainer} xs={12}>
                            <ul className={classes.rankingList} xs={12}>
                                {content.map((item) =>
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
                        </Grid>
                    </Grid>
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
                <Grid container item>
                    <Grid item>
                        <h1 className={classes.rankingTitle}>Veja os comentários dos nossos alunos</h1>
                    </Grid>
                    <Grid container item>

                    </Grid>
                </Grid>
            </Grid>
            }
        </React.Fragment>
    )
}