import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined, GithubFilled } from '@ant-design/icons';

const { Footer } = Layout
const MainFooter = () => {
   return (
         <Footer id='footer' style={{ textAlign: 'center' }}>
             <a href='https://github.com/nss-day-cohort-38/bangazon-ecommerce-web-app-ark-moon' target='_blank'  rel='noopener'>Front-end: <GithubOutlined /></a>    
             <a href='https://github.com/nss-day-cohort-38/bangazon-ecommerce-api-ark-moon' target='_blank'  rel='noopener'>Back-end: <GithubFilled /></a>
         </Footer>
   );
};

export default MainFooter;