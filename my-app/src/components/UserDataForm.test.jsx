import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import UserDataForm from "./UserDataForm";
import store from "../store";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("UserDataForm", () => {
  it("should submit form with correct values", () => {
    render(
      <Provider store={store}>
        <UserDataForm />
      </Provider>
    );
    const firstName = screen.getByRole("textbox", { name: "First Name" });
    const lastName = screen.getByRole("textbox", { name: "Last Name" });
    const email = screen.getByRole("textbox", { name: "Email" });
    const message = screen.getByRole("textbox", { name: "Message" });
    const submit = screen.getByRole("button", { name: "Submit" });

    expect(submit).toBeDisabled();

    act(() => {
      userEvent.type(firstName, "John");
      userEvent.type(lastName, "Doe");
      userEvent.type(email, "john@doe.com");
      userEvent.type(message, "Hello, I am John Doe from United States.");
      userEvent.click(submit);
    });

    expect(mockDispatch).toBeCalled();
  });

  it("should correctly display error messages", () => {
    render(
      <Provider store={store}>
        <UserDataForm />
      </Provider>
    );

    const firstName = screen.getByRole("textbox", { name: "First Name" });
    const lastName = screen.getByRole("textbox", { name: "Last Name" });
    const email = screen.getByRole("textbox", { name: "Email" });
    const message = screen.getByRole("textbox", { name: "Message" });
    const submit = screen.getByRole("button", { name: "Submit" });

    act(() => {
      userEvent.type(firstName, "J");
      userEvent.type(lastName, "D");
      userEvent.type(email, "johndoe.com");
      userEvent.type(message, "Hello.");
      userEvent.click(submit);
    });

    expect(submit).toBeDisabled();
    expect(
      screen.getAllByText("Name must be at least 2 characters.")
    ).toHaveLength(2);
    expect(screen.getByText("Email must be valid.")).toBeInTheDocument();
    expect(
      screen.getByText("Message must be at least 15 characters.")
    ).toBeInTheDocument();
  });
});
