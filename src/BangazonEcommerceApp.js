import React from 'react';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import BodyRouter from './components/BodyRouter';
import './components/navigation/Navigation.css';

function BangazonEcommerceApp() {
  return (
    <div style={{position: 'relative'}}>
      <Navbar/>
      <section id='mainBodyContainer'>
        <BodyRouter/>
      </section>
      <Footer/>
    </div>
  );
}

export default BangazonEcommerceApp;
