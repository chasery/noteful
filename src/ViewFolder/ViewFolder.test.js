import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ViewFolder from "./ViewFolder";

describe("ViewFolder component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<ViewFolder />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
