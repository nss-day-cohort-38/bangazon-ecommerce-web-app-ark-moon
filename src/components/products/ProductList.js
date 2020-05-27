import React from "react";
import { useState, useEffect } from "react";
import AuthManager from "../../modules/AuthManager";
import "./ProductList.css";

const ProductList = ({routerProps}) => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const productList = await AuthManager.getProductList();
      setProducts(productList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="product_list">
        <ul className="list">
          {products.map((product) => (
            <div key={product.id}>
              {product.title}
              <button
                className="product_details_button"
                      onClick={() => routerProps.history.push(`products/${product.id}`)}
                      product={product}
              >
                Details
              </button>
              <li>${product.price}</li>
              <img
                src={product.image_path}
                alt="product img"
                className="product_list_img"
              ></img>
            </div>
          ))}
          ;
        </ul>
      </div>
    </>
  );
};

export default ProductList;
