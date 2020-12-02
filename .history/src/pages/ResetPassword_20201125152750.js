import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

}))


export default function ResetPassword() {



    return (
        <React.Fragment>
        <div className={classes.main}>
  
        <Container component="main" maxWidth="xs">
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert onClose={handleAlertClose} severity="error">
              Usuário ou senha inválidos!
            </Alert>
          </Snackbar>
          <CssBaseline />
          <div className={classes.paper}>
            <h1 className={classes.title}>Login</h1>
              
            <Form className={classes.form} onSubmit={handleSubmit} >
              <Grid container className={classes.formContainer}>
                <Grid item xs={12}>
                  <CustomInput 
                    name="email"
                    label="E-mail"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid container className={classes.buttonsContainer}>
                  <Grid item>
                    <button
                      type="button"
                      className={classes.createAccount}
                    >
                      Criar Conta
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </div>
        </Container>
        </div>
        <div className={classes.footer}>
            <div>
              <a className={classes.footerText}>{"T←ermos & Condições"}</a><a className={classes.footerText} >{"Políticas de Privacidade"}</a>
            </div>
        </div>
      </React.Fragment>
    );
}