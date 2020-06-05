import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//
// Initial State
//

const initialState = {
    cart: []
}

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "addItemToCart": return { ...state, cart: action.value }
        case "removeItemFromCart": return { ...state, cart: action.value }
        default: return state;
    }
    return state;
}

//
// Store..
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };

//
// Action Creators...
//

const addItemToCart = (cart) => {
    //console.log(cart)
    return {
        type: "addItemToCart",
        value: cart
    }
}
export { addItemToCart };

const removeItemFromCart = (cart) => {
    return {
        type: "removeItemFromCart",
        value: cart
    }
}
export { removeItemFromCart };