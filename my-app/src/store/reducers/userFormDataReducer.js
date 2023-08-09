export const ADD_USER_FORM_DATA = "ADD_USER_FORM_DATA";

const userFormDataReducer = (state = [], action) => {
  if (action.type !== ADD_USER_FORM_DATA) return state;

  return [...state, action.payload];
};

export { userFormDataReducer };
