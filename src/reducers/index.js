import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./authReducer";
import { loadReducer } from "./loadReducer";



const rootReducer = combineReducers({
    auth: authReducer,
    load : loadReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))