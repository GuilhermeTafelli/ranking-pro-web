
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { ReactComponent as BronzeMedalIcon } from '../static/bronze-medal.svg';
import { ReactComponent as SilverMedalIcon } from '../static/silver-medal.svg';
import { ReactComponent as GoldMedalIcon } from '../static/gold-medal.svg';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import api from '../services/Api'


const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)

  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});


class UserList extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    const response = await api.get("/users")
    this.setState({ users: response.data })
  }

  getMedals(level) {

    let medals = []

    if (level >= 3)
      medals.push(<Tooltip title="Faturamento acima de 5 mil"><GoldMedalIcon /></Tooltip>)

    if (level >= 2)
      medals.push(<Tooltip title="Primeiro contrato"><SilverMedalIcon /></Tooltip>);

    if (level >= 1)
      medals.push(<Tooltip title="Primeiro parceiro"><BronzeMedalIcon /></Tooltip>);

    return medals
  }

  render() {

    const { classes } = this.props;

    return (
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Maratona 3L'S
                </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
                </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {this.state.users.map((user) => (
              <Grid item key={user.name} xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.name},{user.age}
                      </Typography>
                      <Typography>
                        {user.city}/{user.state}
                      </Typography>
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          {user.wyf}
                        </Typography>
                      </Grid>

                    </CardContent>
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="flex-start"
                    >
                      {this.getMedals(user.level)}

                    </Grid>
                    <CardActions>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(UserList);
