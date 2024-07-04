import React from "react";
import { render } from "@testing-library/react-native";

import DeviceComponent from "./index";

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useTheme: () => ({ colors: { text: "black", primary: "blue" } }),
}));

jest.mock("@i18n/index", () => ({
  t: (key) => key,
}));

jest.mock("@utils/storage", () => ({
  set: jest.fn(),
}));

const device = {
  id: "123",
  name: "Test Device",
  txPowerLevel: -50,
  isConnected: false,
  isConnecting: false,
};

const setModalVisible = jest.fn();
const setModalText = jest.fn();

describe("DeviceComponent", () => {
  it("should render the device name and id", () => {
    const { getByText } = render(
      <DeviceComponent
        device={device}
        setModalVisible={setModalVisible}
        setModalText={setModalText}
      />,
    );
    expect(getByText("Test Device")).toBeTruthy();
  });

  it("should render the connection status", () => {
    const { getByText, getByTestId, rerender } = render(
      <DeviceComponent
        device={device}
        setModalVisible={setModalVisible}
        setModalText={setModalText}
      />,
    );
    expect(getByTestId("device-name")).toBeTruthy();
    rerender(
      <DeviceComponent
        device={{ ...device, isConnected: true }}
        setModalVisible={setModalVisible}
        setModalText={setModalText}
      />,
    );
    expect(getByText("buttons.connected")).toBeTruthy();
    rerender(
      <DeviceComponent
        device={{ ...device, isConnecting: true }}
        setModalVisible={setModalVisible}
        setModalText={setModalText}
      />,
    );
    expect(getByText("buttons.connecting")).toBeTruthy();
  });
});
