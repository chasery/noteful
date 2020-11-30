import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Folder from "./Folder";

describe("Folder component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<Folder />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
