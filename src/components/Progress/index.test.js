import React from "react";
import { render, waitFor } from "@testing-library/react-native";

import Progress from "./index";
import { COLORS } from "@constants/colors";
import styles from "./style";

describe("Progress", () => {
  it("renders with default props", async () => {
    const { getByTestId } = render(<Progress style={{ backgroundColor: "red" }} color="blue" />);
    const indicator = getByTestId("progress-indicator");

    await waitFor(() => expect(indicator).toHaveBeenCalled);
  });
});
