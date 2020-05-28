import React, { useState, useEffect } from 'react'
import productAPI from '../../modules/productManager'  
import CategorySidebar from './CategorySidebar'
import ProductCard from './ProductCard'
import ProductNavbar from './ProductNavbar'
import {Menu, Input, Spin, Switch} from 'antd'
import './Buy.css'

const {Search} = Input

const ProductMain = () => {
    const [selectedCategory, changeCategory] = useState('all')
    const [searchTerm, changeSearchTerm] = useState(null)
    const [searchedLocation, changeSearchedLocation] = useState(null)
    const [products, addAllProducts] = useState(null)
    const [categoryAmount, changeCategoryAmount] = useState()
    const [locationAmount, changeLocationAmount] = useState()
    const [locationBoolean, setLocationBoolean] = useState(false)

    function getProducts(){
        productAPI.getProducts().then(resp=>{
            addAllProducts(resp)
            console.log(resp)
            const categoryObjects = {}
            const locationObjects = {}
            resp.forEach(product=>{
                if (categoryObjects[`${product.product_type.name}`] === undefined){
                    categoryObjects[`${product.product_type.name}`] = 1
                }else{
                    categoryObjects[`${product.product_type.name}`] += 1
                };
                if (locationObjects[`${product.location}`] === undefined){
                    locationObjects[`${product.location}`] = 1
                }else{
                    locationObjects[`${product.location}`] += 1
                }

            })
            changeLocationAmount(locationObjects)
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
            console.log(filtered)
            return filtered
        } else if (selectedCategory !== 'all' && searchTerm !== null){
            const filtered =  products.filter(product=>{
                if((product.title.includes(searchTerm) || product.price.includes(searchTerm) || product.description.includes(searchTerm) || product.location.includes(searchTerm)) && (product.product_type.name === selectedCategory)) {
                    return true
                }
            })
            console.log(filtered)
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
                    return <ProductCard key={i} productObj={productObj}/>
                })
            );
        } else if(products === null) {
            return <h1 style={{'marginLeft':'40%', 'marginTop':'100px'}}>Loading Products . . . <Spin size="large" /> </h1>
        };
    
    };

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        createProductCards()
    },[products])
    useEffect(()=>{
        locationFilter()
    },[locationBoolean])

    return (
        <>
        <CategorySidebar changeCategory={changeCategory} selectedCategory={selectedCategory} categoryAmount={categoryAmount} changeSearchTerm={changeSearchTerm}/>
        <div>
            <ProductNavbar changeSearchTerm={changeSearchTerm} setLocationBoolean={setLocationBoolean} locationBoolean={locationBoolean} locationAmount={locationAmount} changeSearchedLocation={changeSearchedLocation}/>
        
            <div className='productContainer'>
                {createProductCards()}
            </div>
        </div>
        </>
    );
};

export default ProductMain;
