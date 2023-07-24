export const AddExpense = (data) => {
  return {
    type: "ADD_EXPENSE",
    payload: data,
  };
};
export const RemoveExpense = (data) => {
  return {
    type: "REMOVE_EXPENSE",
    data: data,
  };
};
export const EditExpense = () => {
  return {
    type: "EDIT_EXPENSE",
  };
};
