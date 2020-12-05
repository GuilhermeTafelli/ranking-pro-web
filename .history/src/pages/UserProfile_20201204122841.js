import { CardContent, CardHeader, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import MuiPhoneNumber from 'material-ui-phone-number';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CustomMenu from '../components/customMenu/CustomMenu';
const useStyles = theme => ({
    input: {
        fullWidth: true,
    },
    date: {
        margin: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 50,
    },
    container: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(5),
        background: "#eeeeee"
    },
    gridItem: {
        margin: theme.spacing(1),
    },
    fragment: {
        background: "#eeeeee"
    }
});

class UserProfile extends Component {

    render() {

        const { classes } = this.props

        return (
            <React.Fragment className={classes.fragment}>
                <Menu />
                <Container className={classes.container} maxWidth="md">
                    <Card raised={false}>
                        <CardHeader title="Cadastro">
                        </CardHeader>
                        <CardContent>
                            <Grid container>
                                <Grid item className={classes.gridItem} xs={12} lg={6} sm={12}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Nome completo" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={5}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="E-mail" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={3}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Telefone" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={4}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="CEP" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={4}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Endereço" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={4}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Cidade" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={4}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Estado" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={4}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Complemento" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={12} lg={4}>
                                    <TextField className={classes.input} fullWidth={true} id="input-text" label="Data de Nascimento" InputLabelProps={{ shrink: true }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </React.Fragment>

        )
    }
}


export default withStyles(useStyles, { withTheme: true })(UserProfile);