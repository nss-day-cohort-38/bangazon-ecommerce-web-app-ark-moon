import React, {useState} from 'react';
import {Route} from 'react-router-dom'
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import BodyRouter from './components/BodyRouter';
import './components/navigation/Navigation.css';
import './components/orders/Orders.css'

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
            <div id='mainBodyContainer'>
              <BodyRouter searchTerm={searchTerm} locationBoolean={locationBoolean} changeSearchTerm={changeSearchTerm} />
            </div>
            <Footer/>
          </div>
        );
      }}
    />
  );
  
}

export default BangazonEcommerceApp;
