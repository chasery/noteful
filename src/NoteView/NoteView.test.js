import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NoteView from "./NoteView";

describe("NoteView component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<NoteView />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
