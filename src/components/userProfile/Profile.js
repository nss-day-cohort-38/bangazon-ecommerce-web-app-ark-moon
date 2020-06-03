import React, { useState, useEffect } from "react";
import CustomerManager from "../../modules/customerManager";
import PaymentTypeList from "./PaymentTypeList"

const UserProfile = ({routerProps}) => {
  const [customer, setCustomer] = useState(null);

  const getCurrentCustomer = (customer_id) => {
    CustomerManager.getCustomer(customer_id).then((resp) => {
      setCustomer(resp);
    });
  };

  useEffect(() => {
    getCurrentCustomer(sessionStorage.getItem("customerId"));
  }, []);


  if (customer) {
    return (
      <div class="detailsItem">
        <img className='detailsImage' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1'/>
        <h1>
          {customer.user.first_name} {customer.user.last_name}
        </h1>
        <h3>
          <em>{customer.user.username}</em>
        </h3>
        <h3>{customer.phone_number}</h3>
        <h3>{customer.address}</h3>
        <PaymentTypeList />
        <button onClick={() => routerProps.history.push("/newpayment")}>Add New Payment Type</button>
      </div>
    );
  } else {
    return <h1>Loading user...</h1>;
  }
};

export default UserProfile;
