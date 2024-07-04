import React from "react";
import { renderHook } from "@testing-library/react-native";
import { Characteristic } from 'react-native-ble-plx';

import useCharacteristic, { CharacteristicContext } from "./useCharacteristic";

const mockedCharacteristic = {
  id: 123123123123,
  uuid: "fdsfdsfdsfsdf",
  serviceID: 213213123123,
  deviceID: "deviceID",
  isReadable: true,
  isWritableWithResponse: false,
  isWritableWithoutResponse: true,
  isNotifiable: true,
  isNotifying: false,
  isIndicatable: false,
  value: null
};

describe("useCharacteristic", () => {
  it("useCharacteristic returns the value from CharacteristicContext", () => {
    const mockValue = [mockedCharacteristic] as Characteristic[];
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CharacteristicContext.Provider value={mockValue}>
        {children}
      </CharacteristicContext.Provider>
    );

    const { result } = renderHook(() => useCharacteristic(), { wrapper });

    expect(result.current).toEqual(mockValue);
  });
});
