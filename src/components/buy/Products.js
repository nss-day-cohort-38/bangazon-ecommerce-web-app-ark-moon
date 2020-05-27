import React, { useState, useEffect } from 'react'
import productAPI from '../../modules/productManager'  
import CategorySidebar from './CategorySidebar'
import ProductCard from './ProductCard'
import './Buy.css'


const ProductMain = ({routerProps}) => {
    const [selectedCategory, changeCategory] = useState('all')
    const [products, addAllProducts] = useState(null)
    function getProducts(){
        productAPI.getProducts().then(resp=>{
            addAllProducts(resp)
            console.log(resp)
        });
    };

    function createProductCards(){
        if (products !== null){
            if(selectedCategory === 'all'){
                return ( 
                    products.map((productObj, i)=>{
                        return <ProductCard key={i} productObj={productObj} routerProps={routerProps}/>
                    })
                );
            } else {
                const filteredProducts = products.filter(productObj=>productObj.product_type.name === selectedCategory)
                
                return ( 
                    filteredProducts.map((productObj, i)=>{
                        return <ProductCard key={i} productObj={productObj}/>
                    })
                );
            }

        } else if(products === null) {
            return <h1>Loading Products . . . </h1>
        };
    
    };

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        createProductCards()
    },[products])

    return (
        <>
        <CategorySidebar changeCategory={changeCategory} selectedCategory={selectedCategory}/>
        <div className='productContainer'>
            {createProductCards()}
        </div>
        </>
    );
};

export default ProductMain;
