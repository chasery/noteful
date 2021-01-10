import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EditFolder from "./EditFolder";

describe("AddFolder component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<EditFolder />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
