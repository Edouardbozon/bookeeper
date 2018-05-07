import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { Login } from "src/features/authentication/Login";

describe("authentication/Login", () => {
  it("renders node with correct class name", () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(<Login {...props} />);

    expect(renderedComponent.find(".login").node).to.exist;
  });
});
