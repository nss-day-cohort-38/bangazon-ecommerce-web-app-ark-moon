import React from 'react'
import { Card, Tooltip } from 'antd';
import { UnorderedListOutlined, MailOutlined, ShoppingCartOutlined } from '@ant-design/icons';


const { Meta } = Card;

const ProductCard = ({productObj}) => {

    function routePath(){
        window.location = `/buy/${productObj.id}`
    }

  return(
  <Card
    className='productCard'
    cover={
      <img
        className='clickable' 
        onClick={routePath}
        alt="product image"
        src={productObj.image_path}
      />
    }
    actions={[
      <Tooltip placement="left" title='Details'>
        <UnorderedListOutlined className='clickable' key='details' onClick={routePath}/>
      </Tooltip>,
      <Tooltip placement="bottom" title='Contact Seller'>
        <MailOutlined className='clickable' key='contact'/>
      </Tooltip>,
      <Tooltip placement="right" title='Add to Cart'>
        <ShoppingCartOutlined className='clickable' key='addToCart'/>
      </Tooltip>,
    ]}
  >
    <Meta
      title={productObj.title}
      description={`${productObj.product_type.name} in ${productObj.location}         $${productObj.price}           Quantity: ${productObj.quantity}`}
    />
  </Card>
  );
};

export default ProductCard;