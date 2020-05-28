import React from 'react'
import { Input, Switch, Select } from 'antd'

const ProductNavbar = ({changeSearchTerm, locationBoolean, setLocationBoolean, locationAmount, changeSearchedLocation}) => {
    const { Search } = Input
    const { Option } = Select;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }
    function disableLocation(){

    }
   function addLocations(){
       if(locationAmount){
        return Object.keys(locationAmount).map(function(key, index) {
            return <Option value={`${key}`}>{key} ({locationAmount[key]})</Option>
          });
       }
   }
    return (
        <div className='productNavbar'>
            <Search className='searchProductName' placeholder="Search products and locations . . ." onSearch={value => changeSearchTerm(value)} enterButton />

            <p>Local Pickup <Switch onClick={()=>setLocationBoolean(!locationBoolean)} /></p>
            {/* <Select
                showSearch
                style={{ width: 200 }}
                label = 'Search Location'
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {addLocations()}
            </Select> */}

        </div>
    );

};

export default ProductNavbar;