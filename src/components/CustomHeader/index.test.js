import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import CustomHeader from "./index";

describe("CustomHeader", () => {
    it("renders the title prop as text", () => {
        const { getByText } = render(<CustomHeader title="Hello" />);
        expect(getByText("Hello")).toBeTruthy();
    });

    it("renders the left icon prop as an icon button", () => {
        const { getByTestId } = render(<CustomHeader title="Hello" leftIcon="menu" onPressLeftIcon={() => {}} />);
        expect(getByTestId("icon-button")).toBeTruthy();
    });

    it("calls the onPressLeftIcon prop when the icon button is pressed", () => {
        const onPressLeftIcon = jest.fn();
        const { getByTestId } = render(<CustomHeader title="Hello" leftIcon="menu" onPressLeftIcon={onPressLeftIcon} />);
        fireEvent.press(getByTestId("icon-button"));
        expect(onPressLeftIcon).toHaveBeenCalledTimes(1);
    });
});
