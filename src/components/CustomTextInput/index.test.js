import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react-native";

import CustomTextInput from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.useFakeTimers();

describe("CustomTextInput", () => {
  let isState = true;
  const setIsState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation(() => [isState, setIsState]);
  });

  afterEach(() => {
    setIsState.mockClear();
  });

  it("renders the placeholder prop as text", () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Enter your name" onChangeText={() => {}} />,
    );
    expect(getByPlaceholderText("Enter your name")).toBeTruthy();
  });

  it("renders the value prop as text", () => {
    const { getByDisplayValue } = render(
      <CustomTextInput value="John" onChangeText={() => {}} />,
    );
    expect(getByDisplayValue("John")).toBeTruthy();
  });

  it("renders the left icon prop as an icon", () => {
    const { getByTestId } = render(
      <CustomTextInput leftIcon="account" onChangeText={() => {}} />,
    );
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("renders the right icon prop as an icon button", () => {
    const { getByTestId } = render(
      <CustomTextInput
        rightIcon="close"
        onRightIconPress={() => {}}
        onChangeText={() => {}}
      />,
    );
    expect(getByTestId("icon-button")).toBeTruthy();
  });

  it("calls the onRightIconPress prop when the icon button is pressed", () => {
    const onRightIconPress = jest.fn();
    const { getByTestId } = render(
      <CustomTextInput
        rightIcon="close"
        onRightIconPress={onRightIconPress}
        onChangeText={() => {}}
      />,
    );
    fireEvent.press(getByTestId("icon-button"));
    expect(onRightIconPress).toHaveBeenCalledTimes(1);
  });

  it("renders the error message prop as a helper text", () => {
    const { getByText } = render(
      <CustomTextInput errorMessage="Invalid input" onChangeText={() => {}} />,
    );
    expect(getByText("Invalid input")).toBeTruthy();
  });

  it("calls the onChangeText prop when the text input is changed", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomTextInput
        placeholder="Enter your name"
        onChangeText={onChangeText}
      />,
    );
    fireEvent.changeText(getByPlaceholderText("Enter your name"), "Jane");
    expect(onChangeText).toHaveBeenCalledWith("Jane");
  });

  it("is not editable when isEditable prop is false", () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <CustomTextInput
        value="John"
        isEditable={false}
        onChangeText={onChangeText}
      />,
    );
    fireEvent.changeText(getByDisplayValue("John"), "Jane");
    expect(onChangeText).not.toHaveBeenCalled();
  });

  it("should call onPress callback", () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
        <CustomTextInput
            value="John"
            isEditable={false}
            onChangeText={onChangeText}
            secureTextEntry
        />,
    );
    const iconButtonEye = getByTestId("icon-button-eye");
    const {onClick} = iconButtonEye.props;
    onClick();
    expect(setIsState).toHaveBeenCalledWith(false);
  });
});
