import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NoteList from "./NoteList";

describe("NoteList component", () => {
  it("renders without error", () => {
    const wrapper = shallow(<NoteList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
