import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NoteListHeader from "./NoteListHeader";

describe("NoteListHeader component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<NoteListHeader />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
