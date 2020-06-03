import React, {useState, useEffect} from "react"
import productManager from "../../modules/productManager.js"
import {Input, Checkbox} from 'antd'

const Sell = ({routerProps}) => {

const [productInfo, setProductInfo] = useState({title: "", price: "", description: "", quantity: "", location: "none", product_type: ""})
const [productTypes, setProductTypes] = useState([])
const [localPickup, setIsLocalPickup] = useState(false)
const [image, setImage] = useState({ imageFile: "", imagePath: "Choose File" });


  const handleFieldChange = (evt) => {
    const stateToChange = {...productInfo}
    stateToChange[evt.target.id] = evt.target.value
    setProductInfo(stateToChange)
  }

  const handleFileUpload = e => {
    setImage({ imageFile: e.target.files[0], imagePath: e.target.files[0].name });
  };

  const handleSubmit = (e) => {
      e.preventDefault()
    //   This is how our content type is known
      const formData = new FormData();
      formData.append("image_path", image.imageFile, image.imagePath);
      formData.append('title', productInfo.title);
      formData.append('price', parseInt(productInfo.price));
      formData.append('description', productInfo.description);
      formData.append('quantity', parseInt(productInfo.quantity));
      formData.append('location', productInfo.location);
      formData.append('product_type', parseInt(productInfo.product_type));
    
    productManager.postSellableProduct(formData).then((productReturn) => {
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
   <form onSubmit={handleSubmit} >
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
                <Input onChange={handleFileUpload} type="file" id="image_path"  required />
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
