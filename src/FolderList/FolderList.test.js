import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import FolderList from "./FolderList";

describe("FolderList component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<FolderList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
