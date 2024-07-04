import React from "react";
import { render } from "@testing-library/react-native";

import Subtitle from "./index";

const title = "Hello, world!";
const titleStyle = { color: "red", fontSize: 24 };

describe("Subtitle", () => {
  it("should render correctly", () => {
    const { getByTestId, getByText } = render(<Subtitle title={title} />);
    expect(getByTestId("subtitle-text")).toBeTruthy();
    expect(getByText(title)).toBeTruthy();
  });

  it("should apply the titleStyle prop", () => {
    const { getByTestId } = render(
      <Subtitle title={title} titleStyle={titleStyle} />,
    );

    expect(getByTestId("subtitle-text").props.style[1]).toStrictEqual(titleStyle);
  });
});
