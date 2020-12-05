import React, {Component}  from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import CustomMenu from '../components/customMenu/CustomMenu';
import { ReactComponent as BronzeMedalIcon } from '../static/teste.svg';

export default class Main extends Component{
  
  render() {

    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <CustomMenu/>
        <BronzeMedalIcon></BronzeMedalIcon>
        <Footer/>
       </React.Fragment>
    );
  }
}
