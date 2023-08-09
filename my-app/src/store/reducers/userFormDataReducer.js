const UPDATE_USER_FORM_DATA = "UPDATE_USER_FORM_DATA";
const initialUserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const userFormDataReducer = (state = initialUserFormData, action) => {
  if (action.type !== UPDATE_USER_FORM_DATA) return state;

  return {
    ...state,
    userFormData: { ...state.userFormData, ...action.payload },
  };
};

export { userFormDataReducer };
