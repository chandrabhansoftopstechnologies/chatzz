const initailState = {
 
  Expenses: [],
};
export const ExpenseReducer = (state = initailState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      const { id, name, description, amount, split } = action.payload;
      return {
        ...state,
        Expenses: [
          ...state.Expenses,
          {
            id: id,
            name: name,
            description: description,
            amount: amount,
            split: split,
          },
        ],
      };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        Expenses: action.data,
      };

    default:
      return state;
  }
};

