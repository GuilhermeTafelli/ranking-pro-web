import React, { useState, useEffect } from 'react';
import api from '../services/Api'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import CustomMenu from '../components/customMenu/CustomMenu';

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

    return (
        <React.Fragment>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>

        <CustomMenu />
    </React.Fragment>
    );
}
