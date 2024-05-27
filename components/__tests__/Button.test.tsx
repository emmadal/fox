import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";

describe("ButtonComponent", () => {
  it("render correctly", () => {
    const tree = renderer.create(<Button title="submit" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render button title", () => {
    const { getByLabelText } = render(<Button title="Submit" />);
    const button = getByLabelText("Submit", { exact: true });
    expect(button).toBeTruthy();
  });

  it("check 'loading' props is true/false", () => {
    const loading = false;
    expect(render(<Button title="Submit" loading={loading} />)).toBeTruthy();
    expect(loading).toStrictEqual(Boolean(loading));
  });

  it("handle click event once", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<Button title="Submit" onPress={onPress} />);
    const button = getByTestId("button");
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
