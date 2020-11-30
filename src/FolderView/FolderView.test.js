import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FolderView from "./FolderView";

describe("FolderView component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<FolderView />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
