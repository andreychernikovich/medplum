import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ModalComponent from "./index";

jest.mock("@react-navigation/native", () => ({
  useTheme: () => ({
    colors: {
      card: "#ffffff",
      text: "#000000",
    },
  }),
}));

jest.mock("@i18n/index", () => ({
  t: (key) => key,
}));

describe("ModalComponent", () => {
  it("renders the modal with a message", () => {
    const { getByText } = render(
      <ModalComponent
        modalVisible={true}
        setModalVisible={jest.fn()}
        message="Hello, world!"
      />,
    );

    expect(getByText("Hello, world!")).toBeTruthy();
    expect(getByText("buttons.hide")).toBeTruthy();
  });

  it("closes the modal on hide button press", () => {
    const mockSetModalVisible = jest.fn();
    const { getByText } = render(
      <ModalComponent
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        message="Hello, world!"
      />,
    );

    fireEvent.press(getByText("buttons.hide"));
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });
});
