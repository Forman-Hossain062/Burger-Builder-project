import React from 'react';
import './Burger.css';
import Ingredient from '../ingredient/ingredient';
const Burger = props => {

    let ingredientArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, []);

    if (ingredientArr.length === 0) {
        ingredientArr = <p> Please add some ingredients</p>
    }
    // console.log(ingredientArr);
    return (
        <div className="Burger">

            <Ingredient type='top-bread' />
            {ingredientArr}
            <Ingredient type='bottom-bread' />
        </div>
    )
}
export default Burger;