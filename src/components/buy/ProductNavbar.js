import React from 'react'
import { Input, Switch } from 'antd'

const ProductNavbar = ({changeSearchTerm, locationBoolean, setLocationBoolean, routerProps}) => {
    const { Search } = Input

    function handleSearch(value){
        if (window.location.pathname != '/buy'){
            changeSearchTerm(value)

            routerProps.history.push('/buy', changeSearchTerm(value))
        }else {
            console.log(window.location)
            changeSearchTerm(value)
            document.getElementById('mainSearchbar').value = ''
        }
        
    }

    return (
        <div className='productNavbar'>
            <Search id='mainSearchbar' className='searchProductName' placeholder="Search products and locations . . ." onSearch={value=>handleSearch(value)} enterButton />

            <p>Local Pickup <Switch onClick={()=>setLocationBoolean(!locationBoolean)} /></p>

        </div>
    );

};

export default ProductNavbar;