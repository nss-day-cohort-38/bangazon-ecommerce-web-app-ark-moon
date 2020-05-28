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
    getCurrentCustomer(1);
  }, []);

  console.log(customer);

  if (customer) {
    return (
      <h1>
        {customer.user.first_name} {customer.user.last_name}
      </h1>
    );
  } else {
      return <h1>Ain't got shit!</h1>
  }
};

export default UserProfile;
