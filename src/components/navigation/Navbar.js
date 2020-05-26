import React, { useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import { GiftFilled, DollarOutlined, SettingOutlined, ShoppingCartOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import logo from "../../images/BangazonLogo.png"
import profileIcon from "../../images/profileIcon.png"
const { Header } = Layout;
const Navbar = () => {
  const [current, changeSelected] = useState('buy')
  const handleClick = e => {
    console.log('click ', e);
    changeSelected(e.key)
  };
  const loginConditional = () => {
    function logout(){
      sessionStorage.clear()
    };
    if (sessionStorage.getItem('token') === null){
      return <a href='/login'>Login</a>
    } else {
      return <a href='/' onClick={logout}>Logout</a>
    }
  }
  const sellerLogin = () => {
    if (sessionStorage.getItem('token') === null){
      return <a href='/login'>Sell</a>
    } else {
      return <a href='/sell'>Sell</a>
    }
  }
  const profileDropdown = (
    <Menu selectedKeys={[current]} onClick={handleClick}>
      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        My Cart
      </Menu.Item>
      <Menu.Item key="orders" icon={<AppstoreAddOutlined />}>
        My Orders
      </Menu.Item>
      <Menu.Item key='account' icon={<SettingOutlined />}>
        My Account
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='login'>
        {loginConditional()}
      </Menu.Item>
    </Menu>
  );
  return (
    <Header id='navContainer'>
      <a href='/'><img id='navLogo' className='logo' src={logo} alt='Bangazon Logo' /></a>
      <Menu className='navMenu' onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
        <Menu.Item key="buy" icon={<GiftFilled />}>
          Buy
          </Menu.Item>
        <Menu.Item key="sell" icon={<DollarOutlined />}>
          {sellerLogin()}
          </Menu.Item>
        <Dropdown overlay={profileDropdown} placement="bottomCenter" trigger={['click']}>
          <img className='profileIcon' src={profileIcon} alt='profile icon' />
        </Dropdown>
      </Menu>
    </Header>
  );
}
export default Navbar;