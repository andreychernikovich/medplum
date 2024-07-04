import { MMKV } from "react-native-mmkv";
import { reduxStorage } from "./storage";

jest.mock("react-native-mmkv");

const mockStorage = new MMKV();

beforeEach(() => {
  mockStorage.clearAll();
  jest.clearAllMocks();
});

describe("reduxStorage.setItem", () => {
  it("should return a resolved promise with true", async () => {
    const key = "foo";
    const value = "bar";

    const result = await reduxStorage.setItem(key, value);

    expect(result).toBeTruthy();
  });
});

describe("reduxStorage.removeItem", () => {
  it("should return a resolved promise", async () => {
    const key = "foo";
    const value = "bar";
    mockStorage.set(key, value);

    const result = await reduxStorage.removeItem(key);

    expect(result).toBeUndefined();
  });
});
