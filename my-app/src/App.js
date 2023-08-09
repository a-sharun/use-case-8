import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { trim, isLength, isEmail } from "validator";
import Input from "./components/Input";
import { ADD_USER_FORM_DATA } from "./store/reducers/userFormDataReducer";
import store from "./store";

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const EMAIL = "email";
const MESSAGE = "message";
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 15;
const MIN_NAME_LENGTH_ERROR = `Name must be at least ${MIN_NAME_LENGTH} characters.`;
const MIN_MESSAGE_LENGTH_ERROR = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
const INVALID_EMAIL_ERROR = "Email must be valid.";

const validateInput = (input) => {
  const { name, value } = input;

  switch (name) {
    case FIRST_NAME:
    case LAST_NAME:
      return !isLength(trim(value, " "), { min: MIN_NAME_LENGTH })
        ? MIN_NAME_LENGTH_ERROR
        : null;
    case EMAIL:
      return !isEmail(value) ? INVALID_EMAIL_ERROR : null;
    case MESSAGE:
      return !isLength(trim(value, " "), { min: MIN_MESSAGE_LENGTH })
        ? MIN_MESSAGE_LENGTH_ERROR
        : null;
    default:
      return null;
  }
};

function App() {
  const [inputErrors, setInputErrors] = useState({});

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const dispatch = useDispatch();

  const formValuesRef = useRef({});

  const onFormSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    dispatch({
      type: ADD_USER_FORM_DATA,
      payload: formValuesRef.current,
    });

    formValuesRef.current = {};
    [firstNameRef, lastNameRef, emailRef, messageRef].forEach((ref) => {
      ref.current = "";
    });
  };

  const areFormErrors = Object.values(inputErrors).some(Boolean);
  const areFormValues = Object.values(formValuesRef.current).length === 4;

  const handleInputChange = useCallback((event) => {
    console.log(store.getState());
    const { name, value } = event.target;
    const inputValidationResult = validateInput({ name, value });

    setInputErrors((prevState) => ({
      ...prevState,
      [name]: inputValidationResult,
    }));

    formValuesRef.current[name] = value;
  }, []);

  return (
    <form onSubmit={onFormSubmit}>
      <Input
        label="First Name"
        name={FIRST_NAME}
        ref={firstNameRef}
        onChange={handleInputChange}
        errorMessage={inputErrors[FIRST_NAME]}
      />
      <Input
        label="Last Name"
        name={LAST_NAME}
        ref={lastNameRef}
        onChange={handleInputChange}
        errorMessage={inputErrors[LAST_NAME]}
      />
      <Input
        label="Email"
        name={EMAIL}
        ref={emailRef}
        onChange={handleInputChange}
        errorMessage={inputErrors[EMAIL]}
      />
      <Input
        label="Message"
        name={MESSAGE}
        ref={messageRef}
        onChange={handleInputChange}
        errorMessage={inputErrors[MESSAGE]}
      />
      <button type="submit" disabled={areFormErrors || !areFormValues}>
        Submit
      </button>
    </form>
  );
}

export default App;
