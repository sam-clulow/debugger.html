import React from "react";
import { shallow } from "enzyme";
import PreviewFunction from "../../components/shared/PreviewFunction";

describe("PreviewFunction", () => {
  it("should return a span", () => {
    const item = {};
    const returnedSpan = shallow(<PreviewFunction func={item} />);
    expect(returnedSpan).toMatchSnapshot();
    expect(returnedSpan.name()).toEqual("span");
  });

  it('should return a span with a class of "function-signature"', () => {
    const item = {};
    const returnedSpan = shallow(<PreviewFunction func={item} />);
    expect(returnedSpan.hasClass("function-signature")).toBe(true);
  });

  it("should return a span with 3 children", () => {
    const item = {};
    const returnedSpan = shallow(<PreviewFunction func={item} />);
    expect(returnedSpan.children()).toHaveLength(3);
  });

  describe("function name", () => {
    it("should be a span", () => {
      const item = {};
      const returnedSpan = shallow(<PreviewFunction func={item} />);
      expect(
        returnedSpan
          .children()
          .first()
          .name()
      ).toEqual("span");
    });

    it('should have a "function-name" class', () => {
      const item = {};
      const returnedSpan = shallow(<PreviewFunction func={item} />);
      expect(
        returnedSpan
          .children()
          .first()
          .hasClass("function-name")
      ).toBe(true);
    });

    it("should be be set to userDisplayName if defined", () => {
      const item = {
        userDisplayName: "chuck",
        displayName: "norris"
      };
      const returnedSpan = shallow(<PreviewFunction func={item} />);
      expect(
        returnedSpan
          .children()
          .first()
          .first()
          .text()
      ).toEqual("chuck");
    });

    it('should use displayName if defined & no "userDisplayName" exist', () => {
      const item = {
        displayName: "norris",
        name: "last"
      };
      const returnedSpan = shallow(<PreviewFunction func={item} />);
      expect(
        returnedSpan
          .children()
          .first()
          .first()
          .text()
      ).toEqual("norris");
    });

    it('should use to name if no "userDisplayName"/"displayName" exist', () => {
      const item = {
        name: "last"
      };
      const returnedSpan = shallow(<PreviewFunction func={item} />);
      expect(
        returnedSpan
          .children()
          .first()
          .first()
          .text()
      ).toEqual("last");
    });
  });

  describe("render parentheses", () => {
    let leftParen;
    let rightParen;

    beforeAll(() => {
      const item = {};
      const returnedSpan = shallow(<PreviewFunction func={item} />);
      const children = returnedSpan.children();
      leftParen = returnedSpan.childAt(1);
      rightParen = returnedSpan.childAt(children.length - 1);
    });

    it("should be spans", () => {
      expect(leftParen.name()).toEqual("span");
      expect(rightParen.name()).toEqual("span");
    });

    it("should create a left paren", () => {
      expect(leftParen.text()).toEqual("(");
    });

    it("should create a right paren", () => {
      expect(rightParen.text()).toEqual(")");
    });
  });

  describe("render parameters", () => {
    let returnedSpan;
    let children;

    beforeAll(() => {
      const item = {
        parameterNames: ["one", "two", "three"]
      };
      returnedSpan = shallow(<PreviewFunction func={item} />);
      children = returnedSpan.children();
    });

    it("should render spans according to the dynamic params given", () => {
      expect(children).toHaveLength(8);
    });

    it("should render the parameters names", () => {
      expect(returnedSpan.childAt(2).text()).toEqual("one");
    });

    it("should render the parameters commas", () => {
      expect(returnedSpan.childAt(3).text()).toEqual(", ");
    });
  });
});
