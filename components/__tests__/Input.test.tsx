import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "../Input";

describe("InputComponent", () => {
  it("render correctly", () => {
    const tree = render(<Input label="username" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the component label", () => {
    const { getByLabelText } = render(<Input label="username" />);
    const input = getByLabelText("username", {
      exact: true,
    });
    expect(input).toBeTruthy();
  });

  it("update input value correctly", () => {
    const { getByPlaceholderText } = render(
      <Input label="username" placeholder="username" value="johndoe" />,
    );
    const input = getByPlaceholderText("username");
    fireEvent.changeText(input, "johndoe");
    expect(input.props.value).toBe("johndoe");
  });
});
