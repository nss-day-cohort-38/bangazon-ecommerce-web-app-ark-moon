import React, { useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, ShoppingCartOutlined, FrownOutlined } from '@ant-design/icons';
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
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
          </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          Navigation Two
          </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
            </a>
        </Menu.Item>
      </Menu>
      <Dropdown overlay={profileDropdown} placement="bottomCenter" trigger={['click']}>
        <img className='profileIcon' src={profileIcon} alt='profile icon'/>
      </Dropdown>
    </Header>
  );
}

export default Navbar;