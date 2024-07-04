import { renderHook, act } from "@testing-library/react-native";
import { AppState } from "react-native";
import useAppState from "./useAppState";

jest.mock("react-native", () => {
  const listeners = new Map();
  const mockAppState = {
    currentState: "active",
    addEventListener: jest.fn((event, callback) => {
      listeners.set(event, callback);
    }),
    removeEventListener: jest.fn((event) => {
      listeners.delete(event);
    }),
    emit: (event: any, state: any) => {
      listeners.get(event)?.(state);
    },
  };
  return {
    AppState: mockAppState,
  };
});

describe("useAppState", () => {
  it("should return the initial app state", () => {
    const { result } = renderHook(() => useAppState());
    expect(result.current.appState).toBe("active");
  });

  it("should update the app state when the app state changes", () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      // @ts-ignore
      AppState.emit("change", "background");
    });

    expect(result.current.appState).toBe("background");
  });
});
