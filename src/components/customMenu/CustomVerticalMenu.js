import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { logout } from '../../services/Auth'
import history from '../../history'

const useStyles = makeStyles((theme) => ({
    main: {
        background: "#23232c",
        flexDirection: "column",
        height: "100vh",
        paddingTop: "20px",
    },
    title: {
        fontSize: "35px",
        fontFamily: "branding-bold",
        color: "#FFF",
        paddingBottom: "20px",
        textAlign: "center"
    },
    menuItem: {
        textDecoration: "none",
        fontSize: "23px",
        fontFamily: "branding-semibold",
        color: "#FFF",
        padding: "10px 20px",
        cursor: "pointer",
        "&:hover": {
            background: "#2c2c35"
        }
    }
}))

export default function CustomVerticalMenu (){

    const classes = useStyles()
    const dispatch = useDispatch()
    function handleSessionClick() {
        logout()
        dispatch({ type: 'LOGOUT' })
        history.push("/signIn")
    }


    return (
        <Grid item container className={classes.main} xs={2}>
            <h1 className={classes.title}>Admin 3L's</h1>
            <a href="/admin" className={classes.menuItem}>Home</a>
            <a href="/admin/orders" className={classes.menuItem}>Solicitações</a>
            <a className={classes.menuItem}>Usuários</a>
            <a onClick={handleSessionClick} className={classes.menuItem}>Sair</a>

        </Grid>
    )
}