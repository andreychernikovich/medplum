import React from "react";
import { render } from "@testing-library/react-native";
import TimelineItem from "./index";

jest.mock("@i18n/index", () => ({
  t: (key) => key,
}));

const props = {
  title: "Test title",
  subtitle: "Test subtitle",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lectus vitae nisi aliquet lacinia. Fusce id augue quis nisl sagittis tincidunt.",
  icon: "menu",
  date: "28/02/2024",
  time: "17:16",
};

describe("TimelineItem", () => {
  it("should render correctly with props", () => {
    const { getByText } = render(<TimelineItem {...props} />);

    expect(getByText(props.title)).toBeTruthy();
    expect(getByText(props.subtitle)).toBeTruthy();
    expect(getByText(props.comment)).toBeTruthy();
    expect(getByText(props.date)).toBeTruthy();
    expect(getByText(props.time)).toBeTruthy();
  });
});
