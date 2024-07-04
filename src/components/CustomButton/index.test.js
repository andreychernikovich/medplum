import { render, fireEvent } from "@testing-library/react-native";

import CustomButton from "./index";

const onPress = jest.fn();

describe("CustomButton", () => {
  it("renders the title prop as text", () => {
    const { getByText } = render(<CustomButton title="Submit" onPress={() => {}} />);
    expect(getByText("Submit")).toBeTruthy();
  });

  it("calls the onPress prop when pressed", () => {
    const { getByText } = render(<CustomButton title="Submit" onPress={onPress} />);
    fireEvent.press(getByText("Submit"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows an activity indicator when isLoading prop is true", () => {
    const { getByTestId } = render(<CustomButton title="Submit" onPress={() => {}} isLoading />);
    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("shows an error message when error prop is not empty", () => {
    const { getByText } = render(<CustomButton title="Submit" onPress={() => {}} error="Something went wrong" />);
    expect(getByText("Something went wrong")).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    const { getByText } = render(<CustomButton title="Submit" onPress={onPress} disabled />);
    fireEvent.press(getByText("Submit"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
