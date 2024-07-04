import { useAppNavigation } from "./useAppNavigation";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("useAppNavigation", () => {
  it("should return the same navigation prop as useNavigation", () => {
    const mockNavigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };

    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    const navigation = useAppNavigation();

    expect(navigation).toBe(mockNavigation);
  });
});
