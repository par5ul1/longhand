import { describe, expect, test } from "bun:test";
import { camelToKebab, kebabToCamel } from "./convertCases";

import { createWindow } from "../tests/test-utils";
import getExpandedStyles from "./getExpandedStyles";

describe("in `convertCases.ts`", () => {
  test("`camelToKebab()` converts camelCase to kebab-case", () => {
    expect(camelToKebab("backgroundColor")).toBe("background-color");
    expect(camelToKebab("borderTopColor")).toBe("border-top-color");
    expect(camelToKebab("borderLeftColor")).toBe("border-left-color");
    expect(camelToKebab("borderRightColor")).toBe("border-right-color");
    expect(camelToKebab("borderBottomColor")).toBe("border-bottom-color");
  });

  test("`kebabToCamel()` converts kebab-case to camelCase", () => {
    expect(kebabToCamel("background-color")).toBe("backgroundColor");
    expect(kebabToCamel("border-top-color")).toBe("borderTopColor");
    expect(kebabToCamel("border-left-color")).toBe("borderLeftColor");
    expect(kebabToCamel("border-right-color")).toBe("borderRightColor");
    expect(kebabToCamel("border-bottom-color")).toBe("borderBottomColor");
  });
});

describe("in `getExpandedStyles.ts`", () => {
  test("`getExpandedStyles()` takes a style object, strips out non-string or empty values, and returns styles in both camelCase and kebab-case", () => {
    createWindow();
    const styles = document.createElement("div").style;
    styles.setProperty("background-color", "red");
    styles.setProperty("font-size", "12px");
    styles.setProperty("padding", "10px");

    const expectedKebabCaseStyles = {
      "background-color": "red",
      "font-size": "12px",
      padding: "10px",
      "padding-top": "10px",
      "padding-left": "10px",
      "padding-right": "10px",
      "padding-bottom": "10px",
    };
    const expectedCamelCaseStyles = {
      backgroundColor: "red",
      fontSize: "12px",
      padding: "10px",
      paddingTop: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingBottom: "10px",
    };

    expect(getExpandedStyles(styles)).toEqual({
      kebabCaseStyles: expectedKebabCaseStyles,
      camelCaseStyles: expectedCamelCaseStyles,
    });
  });
});
