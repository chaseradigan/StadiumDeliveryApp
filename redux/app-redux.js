import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//
// Initial State
//

const initialState = {
    mapCart: new Map()
}

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "addItem": 
            if(state.mapCart.has(action.value.external_id)){
                let item = Object.assign({},state.mapCart.get(action.value.external_id));
                item.count = item.count +1;
                state.mapCart.set(item.external_id, item);
            }
            else{
                action.value.count = 1;
                state.mapCart.set(action.value.external_id, action.value)
            }
            //console.log(state.mapCart)
            return Object.assign({},state,{ mapCart:state.mapCart})
        case "removeItem":
            let item = Object.assign({},state.mapCart.get(action.value.external_id));
            if(item.count>1){
                item.count = item.count - 1;
                state.mapCart.set(item.external_id, item);
            }
            else{
                state.mapCart.delete(item.external_id);
            }
            //console.log(state.mapCart)
            return Object.assign({},state,{ mapCart:state.mapCart})
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

const addItem = (item) => {
    //console.log(item)
    return {
        type: "addItem",
        value: item
    }
}
export { addItem };

const removeItem = (item) => {
    return {
        type: "removeItem",
        value: item
    }
}
export { removeItem };