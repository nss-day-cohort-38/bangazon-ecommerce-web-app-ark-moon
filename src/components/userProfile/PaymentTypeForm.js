import React, { useState } from "react";
import PaymentTypeManager from "../../modules/paymentTypeManager";
import { Input } from "antd";

const PaymentTypeForm = ({ routerProps }) => {
  const [paymentType, setPaymentType] = useState({
    merchantName: "",
    accountNum: "",
    expirationDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...paymentType };
    stateToChange[evt.target.id] = evt.target.value;
    setPaymentType(stateToChange);
  };

  const buildPaymentType = (evt) => {
    evt.preventDefault();
    const newPaymentType = {
      merchant_name: paymentType.merchantName,
      account_number: paymentType.accountNum,
      expiration_date: paymentType.expirationDate,
    };
    if (
      newPaymentType.merchantName === "" ||
      newPaymentType.accountNum === "" ||
      newPaymentType.expirationDate === ""
    ) {
      window.alert("please make sure all fields have input");
    } else {
      setIsLoading(true);
      PaymentTypeManager.addNewPaymentType(newPaymentType).then(
        routerProps.history.push("/myprofile")
      );
    }
  };

  return (
    <div id="greyBackground">
      <section id="creationForm">
        <form onSubmit={buildPaymentType}>
          <h1>New Payment Type</h1>
          <fieldset>
            <Input
              onChange={handleFieldChange}
              type="text"
              id="merchantName"
              placeholder="Merchant Name"
              value={paymentType.merchantName}
              maxLength="55"
              required
            />
          </fieldset>
          <fieldset>
            <Input
              onChange={handleFieldChange}
              type="text"
              id="accountNum"
              placeholder="Account Number"
              value={paymentType.accountNum}
              maxLength="55"
              required
            />
          </fieldset>
          <fieldset>
            <input
              onChange={handleFieldChange}
              type="date"
              id="expirationDate"
              value={paymentType.expirationDate}
              required
            />
          </fieldset>
          <fieldset>
            <button className="clickable" type="Submit">
              Add Payment Type
            </button>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default PaymentTypeForm;
