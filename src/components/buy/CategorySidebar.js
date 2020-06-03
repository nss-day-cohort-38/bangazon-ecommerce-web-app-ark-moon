import React, {useState, useEffect} from 'react'
import { Menu, PageHeader, Spin } from 'antd';
import {
    AimOutlined
} from '@ant-design/icons';
import productAPI from '../../modules/productManager'

const { SubMenu } = Menu;

const CategorySidebar = ({selectedCategory, changeCategory, categoryAmount, changeSearchTerm}) => {
    const [categories, createCategories] = useState()
    const [loading, setLoading] = useState(true)

    function getCategories(){
        productAPI.getProductTypes().then(resp=>{
            createCategories(resp)
            setLoading(false)
        });
    }

    function selectCategory(e){
        changeCategory(e.key)
        changeSearchTerm(null)

    }

    const categoryMenuItems = () => {
        if (loading === true){
            return <Menu.Item><Spin size="small" style={{'marginLeft':'50px'}}/></Menu.Item>
        } else {
            return categories.map(category=>{
                if (categoryAmount && (categoryAmount[`${category.name}`] !== undefined)){
                    return (
                        <Menu.Item key={category.name} onClick={selectCategory}>
                            - {category.name} ({categoryAmount[category.name]})
                        </Menu.Item>
                    )
                } else {
                return (
                    <Menu.Item key={category.name} onClick={selectCategory}>
                        - {category.name}
                    </Menu.Item>
                )
                }
            })
        }
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
