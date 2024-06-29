import * as React from "react";
import { render } from "@testing-library/react-native";
import { Logo } from "../Logo";

describe("ImageComponent", () => {
  it("render component correctly", () => {
    const tree = render(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the logo correctly from a local file", () => {
    const { getByTestId } = render(<Logo />);
    const logo = getByTestId("logo");
    expect(logo).toBeTruthy();
  });
});
