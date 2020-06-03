import React, { useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import { GiftFilled, DollarOutlined, SettingOutlined, ShoppingCartOutlined, AppstoreAddOutlined, SmileOutlined } from '@ant-design/icons';
import logo from "../../images/BangazonLogo.png"
import profileIcon from "../../images/profileIcon.png"
import ProductNavbar from '../buy/ProductNavbar'
const { Header } = Layout;

const Navbar = ({locationBoolean, setLocationBoolean, changeSearchTerm, routerProps}) => {
  const [current, changeSelected] = useState()
  const handleClick = e => {
    changeSelected(e.key);
    if(e.key){
      window.location = `http://localhost:3000/${e.key}`
    }
  };

  const loginConditional = () => {
    function logout() {
      sessionStorage.clear()
      window.location = '/'
    };
    function login() {
      window.location ='/login'
    }

    if (sessionStorage.getItem('token') !== null) {
      console.log(routerProps)
      return (
        <Menu selectedKeys={[current]} onClick={handleClick}>
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />} href='/mycart'>
            My Cart
          </Menu.Item>
          <Menu.Item key="orders" icon={<AppstoreAddOutlined />} href='orders'>
            My Orders
          </Menu.Item>
          <Menu.Item key='myprofile' icon={<SettingOutlined />} href='/myprofile'>
            My Profile
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      );
    } else {
      console.log(routerProps)
      return (
      <Menu>
        <Menu.Item icon={<SmileOutlined/>} onClick={login}>
          Login
        </Menu.Item>
      </Menu>
      );
    };
  };

  
  useState(()=>{
    setTimeout(function(){
      loginConditional()
  }, 100);
  },[sessionStorage])



  return (
    <Header id='navContainer'>
      <a href='/'><img id='navLogo' className='logo' src={logo} alt='Bangazon Logo' /></a>
      <ProductNavbar changeSearchTerm={changeSearchTerm} setLocationBoolean={setLocationBoolean} locationBoolean={locationBoolean} routerProps={routerProps}/>
      <Menu className='navMenu' onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
        <Menu.Item key="buy" icon={<GiftFilled />}>
          Buy
          </Menu.Item>
        <Menu.Item key="sell" icon={<DollarOutlined />}>
          Sell
          </Menu.Item>
        <Dropdown overlay={loginConditional} placement="bottomCenter" trigger={['click']}>
          <img className='profileIcon' src={profileIcon} alt='profile icon' />
        </Dropdown>
      </Menu>
    </Header>
  );
};
export default Navbar;
