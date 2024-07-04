import React from "react";
import { render } from "@testing-library/react-native";

jest.useFakeTimers();

import ScreenProgress from "./index";

const length = 3;
const index = 1;

describe("ScreenProgress", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(
      <ScreenProgress length={length} index={index} />,
    );
    expect(getByTestId("indicator-container")).toBeTruthy();
    expect(getByTestId("indicator-container").children.length).toStrictEqual(length);
  });
});
