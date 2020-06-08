import React, { useState, useEffect } from 'react'
import productAPI from '../../modules/productManager'  
import CategorySidebar from './CategorySidebar'
import ProductCard from './ProductCard'
import ProductNavbar from './ProductNavbar'
import { Input, Spin } from 'antd'
import orderManager from "../../modules/orderManager";
import './Buy.css'

const ProductMain = ({searchTerm, changeSearchTerm, locationBoolean}) => {
    const [selectedCategory, changeCategory] = useState('all')
    const [products, addAllProducts] = useState(null)
    const [categoryAmount, changeCategoryAmount] = useState()
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        orderManager.getUserOrders().then(ord => {
          setOrders(ord)
        })
      }

    function getProducts(){
        productAPI.getProducts().then(resp=>{
            addAllProducts(resp)
            const categoryObjects = {}
            const locationObjects = {}
            resp.forEach(product=>{
                if (categoryObjects[`${product.product_type.name}`] === undefined){
                    categoryObjects[`${product.product_type.name}`] = 1
                }else{
                    categoryObjects[`${product.product_type.name}`] += 1
                };

            })
            changeCategoryAmount(categoryObjects)
        });
        
    };

    function productFilterUltraFunction(){
        
        if (selectedCategory === 'all' && searchTerm === null){
            return products
        } else if (selectedCategory === 'all' && searchTerm !== null){
            const filtered =  products.filter(product=>{
                if(product.title.includes(searchTerm) || product.price.includes(searchTerm) || product.description.includes(searchTerm) || product.location.includes(searchTerm)) {
                    return true
                }
            })
            return filtered
        } else if (selectedCategory !== 'all' && searchTerm !== null){
            const filtered =  products.filter(product=>{
                if((product.title.includes(searchTerm) || product.price.includes(searchTerm) || product.description.includes(searchTerm) || product.location.includes(searchTerm)) && (product.product_type.name === selectedCategory)) {
                    return true
                }
            })
            return filtered
        } else if (selectedCategory !== 'all' && searchTerm === null){
            const filtered = products.filter(productObj=>productObj.product_type.name === selectedCategory)
            return filtered
        }
    }

    function locationFilter(){
        if(locationBoolean){
            const filteredProducts = productFilterUltraFunction()
            return filteredProducts.filter(prod => prod.location !== 'none')
        }
        else{
            return productFilterUltraFunction()
        }
    }

    function createProductCards(){

        if (products !== null){
            const filteredProducts = locationFilter()
            return ( 
                filteredProducts.map((productObj, i)=>{
                    return <ProductCard key={i} productObj={productObj} orders={orders} setOrders={setOrders} />
                })
            );
        } else if(products === null) {
            return <h1 style={{'marginLeft':'40%', 'marginTop':'100px'}}>Loading Products . . . <Spin size="large" /> </h1>
        };
    
    };

    function searchedTermConditional(){
        if(searchTerm){
            return (
            <p className='searchTerm'>Searching for: {searchTerm} <button onClick={()=>changeSearchTerm(null)}>X</button></p>
            )
        }
    }

    useEffect(()=>{
        getProducts();
        getOrders();
    },[])

    useEffect(()=>{
        createProductCards()
    },[products])
    useEffect(()=>{
        createProductCards()
    },[locationBoolean])

    return (
        <>
        <CategorySidebar changeCategory={changeCategory} selectedCategory={selectedCategory} categoryAmount={categoryAmount}/>
        <div>
            <div className='productContainer'>
            {searchedTermConditional()}
                {createProductCards()}
            </div>
        </div>
        </>
    );
};

export default ProductMain;
