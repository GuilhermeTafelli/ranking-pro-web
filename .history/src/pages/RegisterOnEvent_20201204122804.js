import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer';
import RegisterOnEventForm from '../components/RegisterOnEventForm';
import CustomMenu from '../components/customMenu/CustomMenu';

export default function RegisterOnEvent(){

    return (
      <React.Fragment>
        <CssBaseline />
        <CustomMenu/>
        <RegisterOnEventForm/>
        <Footer/>
       </React.Fragment>
    );
}
