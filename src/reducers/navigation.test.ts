import * as types from "@constants/actionTypes";
import navigationReducer from "./navigation";

describe("navigationReducer", () => {
  const initState = {
    lastScreen: null,
    reversedRtl: false,
  };

  it("should handle SET_LAST_SCREEN action", () => {
    const action = {
      type: types.SET_LAST_SCREEN,
      payload: "Home",
    };
    const expectedState = {
      ...initState,
      lastScreen: "Home",
    };
    expect(navigationReducer(initState, action)).toEqual(expectedState);
  });

  it("should handle REVERSED_RTL action", () => {
    const action = {
      type: types.REVERSED_RTL,
      payload: true,
    };
    const expectedState = {
      ...initState,
      reversedRtl: true,
    };
    expect(navigationReducer(initState, action)).toEqual(expectedState);
  });

  it('should return the initial state', () => {
    const action = {
      type: "",
      payload: "",
    };

    expect(navigationReducer(undefined, action)).toEqual(initState);
  });
});
