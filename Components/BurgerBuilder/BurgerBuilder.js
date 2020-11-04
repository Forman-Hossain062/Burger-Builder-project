

import React, { Component } from 'react';


import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchaseAble } from '../../Redux/actionCreators';


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrices: state.totalPrices,
        purchaseAble: state.purchaseAble,
    }
}

const mapDispatchToprops = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchaseAble: () => dispatch(updatePurchaseAble()),
    }
}

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }

    addIngredientHandle = type => {
        this.props.addIngredient(type);
        this.props.updatePurchaseAble();

    }

    removeIngredientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchaseAble();
    }

    toggleModel = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    handleCheckout = () => {
        this.props.history.push('./checkout');
    }

    render() {
        return (
            <div >
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrices}
                        toggleModal={this.toggleModel}
                        purchaseAble={this.props.purchaseAble}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5> Total price: {this.props.totalPrices.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />

                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#D70F64" }} onClick={this.handleCheckout}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModel}> Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>

        )
    }
}
export default connect(mapStateToProps, mapDispatchToprops)(BurgerBuilder);