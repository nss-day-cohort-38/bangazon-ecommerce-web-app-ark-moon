import React, { useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import { GiftFilled, DollarOutlined, SettingOutlined, ShoppingCartOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import logo from "../../images/BangazonLogo.png"


const profileIcon = require("../../images/profileIcon.png")
const { SubMenu } = Menu;
const { Header } = Layout;

const Navbar = () => {
  const [current, changeSelected] = useState('mail')

  const handleClick = e => {
    console.log('click ', e);
    changeSelected(e.key)
  };

  const profileDropdown = (
    <Menu>
      <Menu.Item icon={<ShoppingCartOutlined />}>
        My Cart
      </Menu.Item>
      <Menu.Item icon={<AppstoreAddOutlined />}>
        My Orders
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>
        My Account
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        Login
      </Menu.Item>
    </Menu>

  );

  return (
    <Header id='navContainer'>
      <a href='/'><img id='navLogo' className='logo' src={logo} alt='Bangazon Logo' /></a>
      <Menu className='navMenu' onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
        <Menu.Item key="mail" icon={<GiftFilled />}>
          Buy
          </Menu.Item>
        <Menu.Item key="app" icon={<DollarOutlined />}>
          Sell
          </Menu.Item>
        <Dropdown overlay={profileDropdown} placement="bottomCenter" trigger={['click']}>
          <img className='profileIcon' src={profileIcon} alt='profile icon' />
        </Dropdown>
      </Menu>
    </Header>
  );
}

export default Navbar;