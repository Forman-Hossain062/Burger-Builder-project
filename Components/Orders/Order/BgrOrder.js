import React from 'react';

const BgrOrder = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span style={{
                border: "1px solid grey",

                borderRadius: "5px",
                padding: "5px",
                marginRight: "10px"
            }} key={item.type} > {item.amount}x  <span style={{ textTransform: "capitalize" }}> {item.type}</span> </span>
        )
    })
    return (
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #88888888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px"
        }}>
            <p> Order number {props.order.id}</p>
            <p> Delivery Address: {props.order.customer.deliveryAddress}</p>
            <hr />
            <hr />
            <p> Total Price: {props.order.price} BDT</p>
            {ingredientSummary}
        </div>
    )
}
export default BgrOrder;