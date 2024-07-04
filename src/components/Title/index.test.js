import React from "react";
import { render } from "@testing-library/react-native";
import Title from "./index";

const titleStyleProp = { color: "red" };

describe("Title", () => {
  it("should render the title prop correctly", () => {
    const { getByText } = render(<Title title="Hello, world!" />);
    expect(getByText("Hello, world!")).toBeTruthy();
  });

  it("should apply the titleStyle prop correctly", () => {
    const { getByText } = render(
      <Title title="Hello, world!" titleStyle={{ color: "red" }} />,
    );
    expect(getByText("Hello, world!").props.style[1]).toStrictEqual(
      titleStyleProp,
    );
  });
});
