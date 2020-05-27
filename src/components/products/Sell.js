import React, {useState, useEffect} from "react"
import AuthManager from "../../modules/AuthManager.js"

const Sell = ({routerProps}) => {

const [productInfo, setProductInfo] = useState({title: "", price: "", description: "", quantity: "", location: "", image_path: "", product_type: ""})
     

  const handleFieldChange = (evt) => {
    const stateToChange = {...productInfo}
    stateToChange[evt.target.id] = evt.target.value
    setProductInfo(stateToChange)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      const product = {
          "title": productInfo.title, 
          "price": productInfo.price, 
          "description": productInfo.description, 
          "quantity": productInfo.quantity, 
          "location": productInfo.location, 
          "image_path": productInfo.image_path
      }
    // ???  API call to product , product type & customer ???
     
  }

 

  return (
   <>
   <form onSubmit={handleSubmit}>
            <h1>Product</h1>
            <fieldset>
                <label htmlFor="title">Title</label>
                <input onChange={handleFieldChange} type="text" id="title" placeholder="Title" value={productInfo.title} maxlength="50"/>
            </fieldset>
            <fieldset>
                <label htmlFor="price">Price</label>
                <input onChange={handleFieldChange} type="number" id="price" placeholder="0.00" min="0" step=".01" value={productInfo.price}/>
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <input onChange={handleFieldChange} type="text" id="description" placeholder="Description" value={productInfo.description}/>
            </fieldset>
            <fieldset>
                <label htmlFor="quantity">Quantity</label>
                <input onChange={handleFieldChange} type="number" id="quantity" placeholder="Quantity" value={productInfo.quantity}/>
            </fieldset>
            <fieldset>
                <label htmlFor="location">Location</label>
                <input onChange={handleFieldChange} type="text" id="location" placeholder="Location" value={productInfo.location}/>
            </fieldset>
            <fieldset>
                <label htmlFor="image_path">Image Path</label>
                <input onChange={handleFieldChange} type="text" id="image_path" placeholder="Image Path" value={productInfo.image_path}/>
            </fieldset>
            
            <fieldset>
            <button type="Submit">Add Product</button>
            </fieldset>
        </form>
   </>
  );
};

export default Sell