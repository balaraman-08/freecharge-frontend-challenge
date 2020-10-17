import { combineReducers } from "redux";
import paymentReducer from "./reducers/paymentReducer";

const rootReducer = combineReducers({ paymentReducer });

export default rootReducer;
