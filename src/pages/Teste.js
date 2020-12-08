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
export default function Teste() {
    const [count, setCount] = useState(0);

    // // Similar ao componentDidMount e componentDidUpdate:
    // useEffect(() => {
    //     // Atualiza o titulo do documento usando a API do browser
    //     document.title = `Você clicou ${count} vezes`;
    // });

    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = {}
    useEffect(async () => {
        setLoading(true)
        const response = await api.get("/socials-media/ranking")
        console.log(response.data.socialsMedia.slice(0, 5))
        await new Promise((resolve) => setTimeout(resolve, 500))
        setContent(["as", "a"])
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
