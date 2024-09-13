import { describe, expect, test } from "bun:test";

import LonghandStyle from "../lib/LonghandStyle";

describe("for valid shorthand `margin: 10px 20px 30px 40px`", () => {
  const originalProperty = "margin";
  const originalValue = "10px 20px 30px 40px";
  const styles = {
    kebabCaseStyles: {
      margin: "10px 20px 30px 40px",
      "margin-top": "10px",
      "margin-right": "20px",
      "margin-bottom": "30px",
      "margin-left": "40px",
    },
    camelCaseStyles: {
      margin: "10px 20px 30px 40px",
      marginTop: "10px",
      marginRight: "20px",
      marginBottom: "30px",
      marginLeft: "40px",
    },
  };

  const longhandStyle = new LonghandStyle(
    originalProperty,
    originalValue,
    styles
  );

  describe("property", () => {
    describe("`originalProperty`", () => {
      test("is the immutable", () => {
        // @ts-expect-error
        expect(() => (longhandStyle.originalProperty = "red")).toThrowError();
      });
    });
    describe("`originalValue`", () => {
      test("is the immutable", () => {
        // @ts-expect-error
        expect(() => (longhandStyle.originalValue = "red")).toThrowError();
      });
    });
    describe("`originalStyles`", () => {
      test("is the innaccessible", () => {
        // @ts-expect-error
        expect(longhandStyle.originalStyles).toBeUndefined();
      });
    });
  });

  describe("getter", () => {
    test("`originalProperty` is the original property", () => {
      expect(longhandStyle.originalProperty).toBe(originalProperty);
    });

    test("`originalValue` is the original value", () => {
      expect(longhandStyle.originalValue).toBe(originalValue);
    });

    test("`kebabCaseStyles` returns the kebab-case styles, with the original property removed", () => {
      // @ts-expect-error
      expect(longhandStyle.kebabCaseStyles).toEqual({
        "margin-top": "10px",
        "margin-right": "20px",
        "margin-bottom": "30px",
        "margin-left": "40px",
      });
    });

    test("`kebabCaseProperties` returns the kebab-case properties, with the original property removed", () => {
      expect(longhandStyle.kebabCaseProperties).toEqual([
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
      ]);
    });

    test("`camelCaseStyles` returns the camelCase styles, with the original property removed", () => {
      // @ts-expect-error
      expect(longhandStyle.camelCaseStyles).toEqual({
        marginTop: "10px",
        marginRight: "20px",
        marginBottom: "30px",
        marginLeft: "40px",
      });
    });

    test("`camelCaseProperties` returns the camelCase properties, with the original property removed", () => {
      expect(longhandStyle.camelCaseProperties).toEqual([
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
      ]);
    });

    test("`styles` returns the styles, with the original property removed", () => {
      // @ts-expect-error
      expect(longhandStyle.styles).toEqual({
        "margin-top": "10px",
        "margin-right": "20px",
        "margin-bottom": "30px",
        "margin-left": "40px",
        marginTop: "10px",
        marginRight: "20px",
        marginBottom: "30px",
        marginLeft: "40px",
      });
    });

    test("`properties` returns the properties, with the original property removed", () => {
      expect(longhandStyle.properties).toEqual([
        "margin-top",
        "margin-right",
        "margin-bottom",
        "margin-left",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
      ]);
    });

    test("`length` returns the number of properties, not including the original property", () => {
      expect(longhandStyle.length).toBe(4);
      expect(longhandStyle.length).toBe(
        Object.keys(styles.kebabCaseStyles).length - 1
      );
      expect(longhandStyle.length).toBe(
        Object.keys(styles.camelCaseStyles).length - 1
      );
    });
  });

  describe("method", () => {
    describe("`isValidLonghandProperty`", () => {
      test("returns true for valid properties", () => {
        expect(longhandStyle.isValidLonghandProperty("margin-top")).toBe(true);
        expect(longhandStyle.isValidLonghandProperty("marginTop")).toBe(true);
      });

      test("returns false for invalid properties", () => {
        expect(longhandStyle.isValidLonghandProperty("invalid-property")).toBe(
          false
        );
      });
    });
  });
});

describe("for invalid shorthand `color: red`", () => {
  const originalProperty = "color";
  const originalValue = "red";
  const styles = {
    kebabCaseStyles: {
      color: "red",
    },
    camelCaseStyles: {
      color: "red",
    },
  };

  const longhandStyle = new LonghandStyle(
    originalProperty,
    originalValue,
    styles
  );

  test("eveything is empty", () => {
    expect(longhandStyle.originalProperty).toBe(originalProperty);
    expect(longhandStyle.originalValue).toBe(originalValue);
    // @ts-expect-error
    expect(longhandStyle.kebabCaseStyles).toEqual({});
    expect(longhandStyle.kebabCaseProperties).toEqual([]);
    // @ts-expect-error
    expect(longhandStyle.camelCaseStyles).toEqual({});
    expect(longhandStyle.camelCaseProperties).toEqual([]);
    // @ts-expect-error
    expect(longhandStyle.styles).toEqual({});
    expect(longhandStyle.properties).toEqual([]);
    expect(longhandStyle.length).toBe(0);
  });
});
