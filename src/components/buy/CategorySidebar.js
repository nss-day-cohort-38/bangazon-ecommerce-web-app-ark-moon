import React, {useState, useEffect} from 'react'
import { Menu, PageHeader } from 'antd';
import {
    AimOutlined
} from '@ant-design/icons';
import productAPI from '../../modules/productManager'

const { SubMenu } = Menu;

const CategorySidebar = ({selectedCategory, changeCategory}) => {
    const [categories, createCategories] = useState([{name: 'loading categories ...'}])

    function getCategories(){
        productAPI.getProductTypes().then(resp=>createCategories(resp));
    }

    function selectCategory(e){
        console.log(e.key)
        changeCategory(e.key)
    }

    const categoryMenuItems = () => {
        return categories.map(category=>{
            return (
                <Menu.Item key={category.name} onClick={selectCategory}>
                    - {category.name}
                </Menu.Item>
            )
        })
    }

    useEffect(()=>{
        getCategories()
    },[])
    useEffect(()=>{
        categoryMenuItems()
    },[categories])

    return (
      <>
        <Menu className='categoryMenu'
          mode={'vertical'}
          theme={'light'}
          selectedKeys={selectedCategory}
        >
           <PageHeader
            className="site-page-header"
            title="Categories"
            />
            <Menu.Item key='all' onClick={selectCategory} icon={<AimOutlined />}>
                Search All
            </Menu.Item>
          {categoryMenuItems()}
        </Menu>
      </>
    );
}


export default CategorySidebar;