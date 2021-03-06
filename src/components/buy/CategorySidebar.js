import React, {useState, useEffect} from 'react'
import { Menu, PageHeader, Spin } from 'antd';
import {
    AimOutlined
} from '@ant-design/icons';
import productAPI from '../../modules/productManager'

const { SubMenu } = Menu;

const CategorySidebar = ({selectedCategory, changeCategory, categoryAmount}) => {
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

    }

    const categoryMenuItems = () => {

        if (loading === true){
            return <Menu.Item><Spin size="small" style={{'marginLeft':'50px'}}/></Menu.Item>
        } else {
            return categories.map(category=>{
                
                if (categoryAmount && (categoryAmount[`${category.name}`] !== undefined)){
                    const sMenuTitle = `${category.name} (${categoryAmount[category.name].length})`
                    const sMenuPreview = () => {
                        const menuArray = [<Menu.Item key={category.name} >Top {categoryAmount[category.name].length > 1 ? 'results' : 'result'}: </Menu.Item>]
                        for(let i=0; i<=(categoryAmount[category.name].length - 1) && i<=2; i++){
                            menuArray.push(
                                <Menu.Item key={category.name} >
                                    {i+1}. {categoryAmount[category.name][i]}
                                </Menu.Item>
                            )
                        }
                        return menuArray;
                    }
                    return (
                        <SubMenu key={category.name} title={sMenuTitle} onClick={selectCategory}>
                            
                            {sMenuPreview()}
                        </SubMenu>
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
