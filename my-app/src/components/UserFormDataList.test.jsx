import { render, screen } from "@testing-library/react";
import UserFormDataList from "./UserFormDataList";

const currentState = {
  userFormData: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      message: "Hello",
    },
  ],
};
const mockUseSelecor = () => currentState.userFormData;
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => mockUseSelecor(),
}));

describe("UserFormDataList", () => {
  it("should render table correctly", () => {
    render(<UserFormDataList />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@doe.com")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("should not render table", () => {
    currentState.userFormData = [];
    render(<UserFormDataList />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
