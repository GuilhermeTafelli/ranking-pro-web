import React, {Component}  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import history from '../history'

export default function Menu() {
  
  function handleSessionClick() {
      history.push("/signIn")
  }

    return (
      <React.Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Ranking Social Medias
                    </Typography>
                    <Button
                variant="contained"
                color="primary"
                className="{classes.button}"
                endIcon={<MenuIcon />}
                onClick={handleSessionClick}
              >
                Entrar
             </Button>
                </Toolbar>
             </AppBar>
       </React.Fragment>
    );
  }
