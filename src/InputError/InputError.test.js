import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import InputError from "./InputError";

describe("InputError component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<InputError />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
