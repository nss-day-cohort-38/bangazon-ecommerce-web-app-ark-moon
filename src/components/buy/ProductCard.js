import React from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProductCard = ({productObj}) => {
  return(
  <Card
    className='productCard'
    cover={
      <img
        alt="product image"
        src={productObj.image_path}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={productObj.title}
      description={`${productObj.product_type.name} in ${productObj.location}`}
    />
  </Card>
  );
};

export default ProductCard;