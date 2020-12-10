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
    line: {
        margin: "20px 10px",
        borderTop: "1px solid #e5e5e5",
        display: "inline-block"
    },
    title: {
        fontFamily: "branding-bold",
        fontSize: "18px"
    },
    rankingItem: {
        padding: "10px 20px",
        [theme.breakpoints.down("xs")]: {
            padding: "10px 10px",
        },
        backgroundColor: "#FFF",
        margin: "10px 0px",
        borderRadius: "30px",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.09)",
        cursor: "pointer"
    },
    rankingPosition: {
        fontSize: "28px",
        fontFamily: "branding-medium",
        color: "#3052DE"
    },
    rankingItemPhoto: {
        borderRadius: "57px"
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
        [theme.breakpoints.down("xs")]: {
            fontSize: "22px",
        },
        fontSize: "30px",
        fontFamily: "branding-bold",
        color: "#373737",
        textAlign: "center"
    },
    rankingListContainer: {
        background: "#FFF",
        padding: "5px 20px",
        borderRadius: "30px",
        margin: "20px 0px",
        overflowY: "auto",
    },
    sectionDesktop: {
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
        width: "45px",
        borderRadius: "20px",
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
    rankingRevenues: {
        backgroundColor: "#D4D4D4",
        borderRadius: "31px",
        border: "none",
        padding: "10px 26px",
        fontFamily: "branding-semibold",
        color: "#858585",
        fontSize: "20px",
        marginBottom: "30px"
      },
}));

export default function RankingScore() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const [content, setContent] = useState(false);
    const [mySocialMedia, setMySocialMedia] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/socials-media/ranking/score")
        await new Promise((resolve) => setTimeout(resolve, 500))
        await setContent(response.data.socialsMedia)
        await setMySocialMedia(response.data.mySocialMedia)
        console.log(response.data.mySocialMedia)
        await setLoading(false)
    }, []);

    function handleClickItem(item) {
        dispatch(
            {
                type: "SOCIAL_MEDIA_POSITION",
                position: item.position
            })
        history.push("/socials-media/" + item.id)
    }


    function formatScore(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomMenu />
            {content && <div className={classes.main}>
                <Grid container className={classes.mainContainer} md={6}>
                    {mySocialMedia &&
                        <Grid container xs={12}>
                            <Grid item xs={12}>
                                <h1 className={classes.title}>Sua posição</h1>
                            </Grid>
                            <Grid container className={classes.rankingItem} onClick={() => (handleClickItem(mySocialMedia))} xs={12}>

                                <Grid item className={classes.itemInfos} >
                                    <Grid container className={classes.itemInfosContainer}>
                                        <Grid item>
                                            <h2 className={classes.rankingPosition}>{mySocialMedia.position}</h2>
                                        </Grid>
                                        <Grid item className={classes.item}>
                                            <img className={classes.profilePhoto} src={mySocialMedia.profilePhotoLink} />
                                        </Grid>
                                        <Grid item className={classes.rankingItemNameContainer}>
                                            <h3 className={classes.rankingItemName}>{mySocialMedia.fullName.split(" ")[0]}</h3>
                                            <h4 className={classes.rankingItemLocation}>{mySocialMedia.city ? mySocialMedia.city : "-"}</h4>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item className={classes.sectionDesktop}>
                                    <Grid container className={classes.sectionDesktopContainer}>
                                        <h2 className={classes.rankingItemInfoText}>{mySocialMedia.score ? formatScore(mySocialMedia.score) + " pontos" : "-"}</h2>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <h1 className={classes.title}>Ranking</h1>
                    </Grid>
                    <Grid item container className={classes.rankingListContainer} xs={12}>
                        <ul className={classes.rankingList} xs={12}>
                            {content.map((item, index) =>
                                <li >
                                    <Grid container className={classes.rankingItem} onClick={() => (handleClickItem(item))}>

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
                                        <Grid item className={classes.sectionDesktop}>
                                            <Grid container className={classes.sectionDesktopContainer}>
                                                <h2 className={classes.rankingItemInfoText}>{item.score ? formatScore(item.score) + " pontos" : "-"}</h2>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </li>
                            )}
                        </ul>
                    </Grid>
                </Grid>
            </div>
            }
        </React.Fragment>
    );
}