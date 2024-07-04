import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import ProfileTextInput from "./index";

jest.useFakeTimers();

describe("ProfileTextInput", () => {
  it("should render the title and the input", () => {
    const { getByText } = render(
      <ProfileTextInput title="Name" value="John" />,
    );
    expect(getByText("Name")).toBeTruthy();
  });

  it("should render the right icon and the error message if provided", () => {
    const { getByText } = render(
      <ProfileTextInput
        title="Email"
        value="john@example.com"
        rightIcon="check"
        errorMessage="Invalid email"
      />,
    );

    expect(getByText("Invalid email")).toBeTruthy();
  });

  it("should render the input as editable or not depending on the prop", () => {
    const { getByTestId, rerender } = render(
      <ProfileTextInput title="Phone" value="1234567890" isEditable={false} />,
    );
    const customTextInputWrapper = getByTestId("custom-text-input-wrapper");
    const customTextInput = customTextInputWrapper.props.children[1];
    expect(customTextInput.props.isEditable).toBe(false);
  });

  it("should render the input with the correct keyboard type if provided", () => {
    const { getByTestId, rerender } = render(
      <ProfileTextInput title="Age" value="25" keyboardType="numeric" />,
    );
    const customTextInputWrapper = getByTestId("custom-text-input-wrapper");
    const customTextInput = customTextInputWrapper.props.children[1];
    expect(customTextInput.props.keyboardType).toBe("numeric");
  });

  it("should render the input with the correct content style if provided", () => {
    const { getByTestId } = render(
      <ProfileTextInput
        title="Bio"
        value="Hello, I am John"
        contentStyle={{ color: "red" }}
      />,
    );
    const customTextInputWrapper = getByTestId("custom-text-input-wrapper");
    const customTextInput = customTextInputWrapper.props.children[1];
    expect(customTextInput.props.contentStyle.color).toBe("red");
  });

  it("should call the onChangeText prop when the input value is changed", () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <ProfileTextInput
        title="Username"
        value="john123"
        onChangeText={mockOnChangeText}
      />,
    );
    const customTextInputWrapper = getByTestId("custom-text-input-wrapper");
    const customTextInput = customTextInputWrapper.props.children[1];
    fireEvent.changeText(customTextInput, "john456");
    expect(mockOnChangeText).toHaveBeenCalledWith("john456");
  });
});
