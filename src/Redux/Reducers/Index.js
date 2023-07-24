import { combineReducers } from "redux";
import { ExpenseReducer } from "./ProductReducer";

const CombineReducers = combineReducers({
  AllExpense: ExpenseReducer,
});
export default CombineReducers;
