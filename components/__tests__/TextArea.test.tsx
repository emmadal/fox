import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { TextArea } from "../TextArea";

describe("InputComponent", () => {
  it("render correctly", () => {
    const tree = renderer.create(<TextArea placeholder="biography" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("update input value correctly", () => {
    const { getByPlaceholderText } = render(
      <TextArea placeholder="biography" value="My bio" />,
    );
    const input = getByPlaceholderText("biography");
    fireEvent.changeText(input, "My bio");
    expect(input.props.value).toBe("My bio");
  });
});
