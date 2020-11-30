import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ViewAll from "./ViewAll";

describe("ViewAll component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<ViewAll />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
