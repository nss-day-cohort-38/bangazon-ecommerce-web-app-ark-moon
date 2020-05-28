import React, {useState, useEffect} from "react"
import productManager from "../../modules/productManager.js"


const Sell = ({routerProps}) => {

const [productInfo, setProductInfo] = useState({title: "", price: "", description: "", quantity: "", location: "", image_path: "", product_type: ""})
const [productTypes, setProductTypes] = useState([])
const [localDelivery, setIsLocalDelivery] = useState(false)
const [isChecked, setIsChecked] = useState(false)
     

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
   
    productManager.postSellableProduct(product).then(routerProps.history.push("/"))
    // If local delivery = true, on submit will push to an array (?) of searchable cities
    
  }

  const getProductTypes = () => {
      productManager.getProductTypes().then(productTypes => {
          setProductTypes(productTypes)
      })
  }

  const handleCheckBox = () => { setIsLocalDelivery(!localDelivery)  }
  

useEffect(() => {
    getProductTypes()
   
}, [])

useEffect(() => {
    console.log(localDelivery)
}, [localDelivery])

  return (
   <>
   <form onSubmit={handleSubmit}>
            <h1>Product</h1>
            <fieldset>
                <label htmlFor="title">Title</label>
                <input onChange={handleFieldChange} type="text" id="title" placeholder="Title" value={productInfo.title} maxLength="50" required />
            </fieldset>
            <fieldset>
                <label htmlFor="price">Price</label>
                <input onChange={handleFieldChange} type="number" id="price" placeholder="0.00" min="0" step=".01" value={productInfo.price} required />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description</label>
                <input onChange={handleFieldChange} type="text" id="description" placeholder="Description" value={productInfo.description}required />
            </fieldset>
            <fieldset>
                <label htmlFor="quantity">Quantity</label>
                <input onChange={handleFieldChange} type="number" id="quantity" placeholder="Quantity" value={productInfo.quantity}required />
            </fieldset>
            <fieldset>
                <label htmlFor="location">Location</label>
                <input onChange={handleFieldChange} type="text" id="location" placeholder="Location" value={productInfo.location}required />
            </fieldset>
            <fieldset>
                <label>Local Delivery </label>
                <input type="checkbox" value="check" onChange = {handleCheckBox}></input>
            </fieldset>
            <fieldset>
                <label htmlFor="image_path">Image Path</label>
                <input onChange={handleFieldChange} type="text" id="image_path" placeholder="Image Path" value={productInfo.image_path}required />
            </fieldset>
            <fieldset>
                <label>Product Types:</label>
                <select className="select" id="product_type" onChange={handleFieldChange} required >
              {productTypes.map(productType => {
                 return <option key={productType.id} value={productType.id}>
                 {productType.name}
               </option>
                })}
               </select>
            </fieldset>
            <fieldset>
            <button type="Submit">Add Product</button>
            </fieldset>
        </form>
   </>
  );
};

export default Sell