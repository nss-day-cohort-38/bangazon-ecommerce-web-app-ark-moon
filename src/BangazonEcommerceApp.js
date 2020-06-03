import React, {useState} from 'react';
import {Route} from 'react-router-dom'
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import BodyRouter from './components/BodyRouter';
import './components/navigation/Navigation.css';

function BangazonEcommerceApp() {
  const [searchTerm, changeSearchTerm] = useState(null);
  const [locationBoolean, setLocationBoolean] = useState(false);

  return (
    <Route
      path='/'
      render={(routerProps)=>{
        return (
          <div style={{'position': 'relative'}}>
            <Navbar changeSearchTerm={changeSearchTerm} setLocationBoolean={setLocationBoolean} locationBoolean={locationBoolean} routerProps={routerProps}/>
            <section id='mainBodyContainer'>
              <BodyRouter searchTerm={searchTerm} locationBoolean={locationBoolean} changeSearchTerm={changeSearchTerm} />
            </section>
            <Footer/>
          </div>
        );
      }}
    />
  );
  
}

export default BangazonEcommerceApp;
