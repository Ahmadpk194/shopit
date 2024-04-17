import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
// Remove import for composeWithDevTools

import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducers';
import { allUsersReducer, authReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer';
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer, 
    newOrder: newOrderReducer,
    myOrder: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer, 
    newProduct: newProductReducer,
    allOrders: allOrderReducer,
    order: orderReducer, 
    allUsers: allUsersReducer, 
    userDetails: userDetailsReducer, 
    productReviews: productReviewsReducer,
    review: reviewReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')): {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middleware)); // Remove composeWithDevTools()
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;
