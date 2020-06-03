import React from "react";

const PaymentTypeCard = props => {

    const accountFormatter = accountNum => {
        const splitNum = accountNum.split("")
        const slicedNum = splitNum.slice(Math.max(splitNum.length - 4, 1))
        return slicedNum
    }

    const expoDateFormatter = expirationDate => {
        const splitDate = expirationDate.split("-")
        return `${splitDate[1]}/${splitDate[0]}`
    }

    return (<>
    <h2>{props.paymentType.merchant_name}</h2>
    <h4>{accountFormatter(props.paymentType.account_number)}</h4>
    <h4>Expires {expoDateFormatter(props.paymentType.expiration_date)}</h4>
    <button type="button" onClick={() => props.deletePaymentType(props.paymentType.id)}>Delete</button>
    </>)
}

export default PaymentTypeCard