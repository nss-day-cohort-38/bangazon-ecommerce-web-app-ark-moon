import React, { useState, useEffect } from "react";
import CustomerManager from "../../modules/customerManager";

const UserProfile = () => {
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
      <>
        <h1>
          {customer.user.first_name} {customer.user.last_name}
        </h1>
        <h3>
          <em>{customer.user.username}</em>
        </h3>
        <h3>{customer.phone_number}</h3>
        <h3>{customer.address}</h3>
      </>
    );
  } else {
    return <h1>Ain't got shit!</h1>;
  }
};

export default UserProfile;
