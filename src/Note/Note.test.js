import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Note from "./Note";

describe("Note component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<Note />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
