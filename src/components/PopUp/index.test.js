import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

import { PopUp } from "./index";

const mockHideModal = jest.fn();

describe("PopUp", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <PopUp modalVisible={true} hideModal={mockHideModal}>
        <Text>Some content</Text>
      </PopUp>,
    );

    expect(getByTestId("modal")).toBeTruthy();
    expect(getByText("Close")).toBeTruthy();
    expect(getByText("Some content")).toBeTruthy();
  });

  it("calls hideModal when close button is pressed", () => {
    const { getByText } = render(
      <PopUp modalVisible={true} hideModal={mockHideModal}>
        <Text>Some content</Text>
      </PopUp>,
    );

    fireEvent.press(getByText("Close"));
    expect(mockHideModal).toHaveBeenCalledTimes(1);
  });
});
