import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react-native";
import RememberMe from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.mock("@i18n/index", () => ({
  t: (key) => key,
}));

describe("RememberMe", () => {
  const isRememberMe = false;
  const setIsRememberMe = jest.fn();
  const mockOnPress = jest.fn();

  beforeEach(() => {
    useState.mockImplementation(() => [isRememberMe, setIsRememberMe]);
  });

  afterEach(() => {
    setIsRememberMe.mockClear();
  });

  it("renders with onPress prop", () => {
    const { getByTestId } = render(<RememberMe onPress={mockOnPress} />);
    const rememberMeWrapper = getByTestId("rememberMeWrapper");
    expect(rememberMeWrapper.props.children.length).toStrictEqual(2);
  });

  it("toggles remember me state", () => {
    const { getByTestId } = render(<RememberMe onPress={mockOnPress} />);
    const rememberMeWrapper = getByTestId("rememberMeWrapper");
    const { onPress } = rememberMeWrapper.props.children[0].props;
    onPress();

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalled;
  });
});
