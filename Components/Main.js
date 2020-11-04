import React, { Component } from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import Orders from './Orders/Order';
import Checkout from './Orders/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../Redux/authActionCreators';
import Logout from './Auth/Logout';
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}
const mapStateToProps = state => {
    return {
        token: state.token,
    }
}
class Main extends Component {
    componentDidMount() {
        this.props.authCheck()
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to='/login' />
                </Switch>
            )
        }
        else {
            routes = (
                <Switch>
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />

                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);