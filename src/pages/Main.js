import React, {Component}  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserList from '../components/UserList';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import CustomMenu from '../components/CustomMenu'

export default class Main extends Component{
  
  render() {

    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <CustomMenu/>
        <UserList/>
        <Footer/>
       </React.Fragment>
    );
  }
}
