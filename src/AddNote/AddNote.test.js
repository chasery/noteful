import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddNote from "./AddNote";

describe("AddNote component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<AddNote />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
