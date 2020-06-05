import React, { useState, useEffect } from "react";
import paymentTypeManager from "../../modules/paymentTypeManager";
import PaymentTypeCard from "./PaymentTypeCard";

const PaymentTypeList = ({customer}) => {
  const [paymentTypes, setPaymentTypes] = useState(null);

  async function getPaymentTypes() {
    await paymentTypeManager.getPaymentListByCustomer().then((resp) => {
      setPaymentTypes(resp);
    });
  }

  const deletePaymentType = (id) => {
    paymentTypeManager.deletePaymentType(id).then(() => {
      paymentTypeManager.getPaymentListByCustomer().then(setPaymentTypes);
    });
  };

  const createPaymentCards = () => {
    if (paymentTypes) {
      return paymentTypes.map((paymentType) => {
        return (
          <PaymentTypeCard key={paymentType.id} paymentType={paymentType} deletePaymentType={deletePaymentType} customer={customer}/>
        );
      });
    }
  };

  useEffect(() => {
    getPaymentTypes();
  }, []);

  useEffect(() => {
    createPaymentCards();
  }, [paymentTypes]);

  return <div>{createPaymentCards()}</div>;
};

export default PaymentTypeList;
