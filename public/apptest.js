import React from "react";
import { shallow } from "enzyme";
import App from "/.app";
import test from "test";

test("app set state", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state("id")).toBe(undefined);
});
