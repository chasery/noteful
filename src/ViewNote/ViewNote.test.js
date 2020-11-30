import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ViewNote from "./ViewNote";

describe("ViewNote component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<ViewNote />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
