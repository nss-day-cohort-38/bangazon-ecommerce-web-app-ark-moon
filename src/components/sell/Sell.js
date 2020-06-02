import React, {useState, useEffect} from "react"
import productManager from "../../modules/productManager.js"
import {Input, Checkbox} from 'antd'

const Sell = ({routerProps}) => {

const [productInfo, setProductInfo] = useState({title: "", price: "", description: "", quantity: "", location: "none", image_path: "", product_type: ""})
const [productTypes, setProductTypes] = useState([])
const [localPickup, setIsLocalPickup] = useState(false)


  const handleFieldChange = (evt) => {
    const stateToChange = {...productInfo}
    stateToChange[evt.target.id] = evt.target.value
    setProductInfo(stateToChange)
  }


  const handleSubmit = (e) => {
      e.preventDefault()
      const product = {
          "title": productInfo.title, 
          "price": parseInt(productInfo.price), 
          "description": productInfo.description, 
          "quantity": parseInt(productInfo.quantity), 
          "location": productInfo.location, 
          "image_path": productInfo.image_path,
          "product_type": parseInt(productInfo.product_type)
      }
    
   
    productManager.postSellableProduct(product).then((productReturn) => {
        routerProps.history.push(`/buy/${productReturn.id}`)
    })
    
  }

  const getProductTypes = () => {
      productManager.getProductTypes().then(productTypes => {
          setProductTypes(productTypes)
      })
  }

  const handleCheckBox = () => { setIsLocalPickup(!localPickup)  }
  

useEffect(() => {
    getProductTypes()
}, [])

useEffect(() => {
    localPickupConditional()
}, [localPickup])

const localPickupConditional = () => { document.getElementById("locationField").classList.toggle("hidden")}

  return (
   <div id='greyBackground'>
       <section id='creationForm'>
   <form onSubmit={handleSubmit} enctype='multipart/form-data'>
            <h1>Sell A Product</h1>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="title" placeholder="Title" value={productInfo.title} maxLength="50" required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="number" id="price" placeholder="Price" min="0" step=".01" value={productInfo.price} required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="text" id="description" placeholder="Description" value={productInfo.description}required />
            </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="number" id="quantity" placeholder="Quantity" value={productInfo.quantity}required />
            </fieldset>
            <fieldset>
                 <Checkbox value={localPickup} onChange = {handleCheckBox}>Local Pickup</Checkbox>
             </fieldset>
             <fieldset id="locationField">
                 <Input onChange={handleFieldChange} type="text" id="location" placeholder="Location"  />
             </fieldset>
            <fieldset>
                <Input onChange={handleFieldChange} type="file" id="image_path" placeholder="Image Path"accept="image/x-png,image/gif,image/jpeg" value={productInfo.image_path}required />
            </fieldset>
            <fieldset>
                <label>Product Types:</label>
                <select className="select" id="product_type" onChange={handleFieldChange} required >
                    {/* Value must be set to empty string to know it has not been selected */}
                <option disabled={true} selected value="">Select</option>
              {productTypes.map(productType => {
                 return <option key={productType.id} value={productType.id}>
                 {productType.name}
               </option>
                })}
               </select>
            </fieldset>
            <fieldset>
            <button className='clickable' type="Submit">Add Product</button>
            </fieldset>
        </form>
        </section>
   </div>
  );
};

export default Sell
