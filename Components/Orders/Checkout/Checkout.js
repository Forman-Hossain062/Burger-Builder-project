
import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';

import { resetIngredient } from '../../../Redux/actionCreators';
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrices: state.totalPrices,
        purchaseAble: state.purchaseAble,
        userId: state.userId,
        token: state.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredient: () => dispatch(resetIngredient()),
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }
    goBack = () => {
        this.props.history.goBack('/');
    }
    inputChangeHandle = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }
    submitHandler = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            priceL: this.props.totalPrices,
            orderTime: new Date(),
            userId: this.props.userId,
        }
        axios.post("https://burger-builder-63379.firebaseio.com/orders.json?auth=" + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: " Successfully Placed Order!"
                    });
                    this.props.resetIngredient();
                }
                else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: " Something Went Wrong! Please Again Order!"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: " Something Went Wrong! Please Again Order!"
                })
            })
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid grey",
                boxShadow: " 1px 1px #8888888",
                borderRadius: "5px",
                padding: "20px"
            }}>
                Payment: {this.props.totalPrices} BDT
                </h4>
            <form style={{
                border: "1px solid grey",
                boxShadow: " 1px 1px #8888888",
                borderRadius: "5px",
                padding: "20px"
            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address"
                    onChange={(e) => this.inputChangeHandle(e)}> </textarea>
                <br />

                <input name="phone" placeholder="Your Phone Number" className="form-control" value={this.state.values.phone} onChange={(e) => this.inputChangeHandle(e)} />
                <br />

                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandle(e)} >
                    <option value="Cash On Delivery" >Cash On Delivery </option>
                    <option value="Bkash" > Bkash</option>
                </select>
                <br />

                <Button className="mr-auto" style={{ backgroundColor: "#D70F64" }} onClick={this.submitHandler} disabled={!this.props.purchaseAble} > Place Order </Button>
                <Button className="ml-1" color="secondary" onClick={this.goBack}> Cancel </Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack} >
                    <p> {this.state.modalMsg}</p>
                </Modal>
            </div >
        )

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);