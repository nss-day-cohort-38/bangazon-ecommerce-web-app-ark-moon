import React from "react";
import cardChip from "../../images/cardChip.png"
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

    return (
            <div className='cardContainer'>
                <h1 className='cardType'>{props.paymentType.merchant_name}</h1>
                <h3 className='cardAccount'>* * * * * * * * * * {accountFormatter(props.paymentType.account_number)}</h3>
                <h4 className='cardExp'>Exp.{expoDateFormatter(props.paymentType.expiration_date)}</h4>
                <h3 className='cardHolder'>{props.customer.user.first_name} {props.customer.user.last_name}</h3>
                <img className='cardChipImg' src={cardChip} />
                <button className='deleteCard clickable' type="button" onClick={() => props.deletePaymentType(props.paymentType.id)}>Delete</button>
            </div>
            
    )
}

export default PaymentTypeCard