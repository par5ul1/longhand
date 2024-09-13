import { describe, expect, test } from "bun:test";
import { camelToKebab, kebabToCamel } from "../utils/convertCases";

import Longhand from "../lib/Longhand";
import getExpandedStyles from "../utils/getExpandedStyles";
import shorthandProperties from "./shorthand-properties.json";
import { createWindow } from "./test-utils";

const constructLonghand = (options?: Longhand["options"]) => {
  createWindow();
  return new Longhand(options);
};

test("constructor throws without `window` or `document`", () => {
  // @ts-expect-error
  global.window = undefined;
  // @ts-expect-error
  global.document = undefined;
  expect(global.window).toBeUndefined();
  expect(global.document).toBeUndefined();
  expect(() => new Longhand()).toThrowError();
});

const longhand = constructLonghand();
const longhandWithOptions = constructLonghand({ ignoreInitial: true });

describe("`options` property", () => {
  test("is `undefined` by default", () => {
    expect(longhand.options).toBeUndefined();
  });
  test("is set for instance with { ignoreInitial: true }", () => {
    expect(longhandWithOptions.options).toBeDefined();
    expect(longhandWithOptions.options?.ignoreInitial).toBe(true);
  });
  test("is immutable", () => {
    expect(
      // @ts-expect-error
      () => (longhandWithOptions.options = { ignoreInitial: false })
    ).toThrowError();
  });
});

function createParseTests(name: string, parseMethod: Longhand["parse"]) {
  describe(name, () => {
    shorthandProperties.forEach(({ property, value, unsupported }) => {
      if (unsupported?.property) {
        test.skip(`is skipped for \`${property}\` because it is not supported by \`jsdom\`.`, () => {
          expect(() => parseMethod(property as any, value)).toThrowError(); // If this test fails, it means `jsdom` started supporting the property
        });
      } else {
        test(`for \`${property}\` \x1b[0m\x1b[2m(and value \`${value}\`)\x1b[22m\x1b[1m does not throw`, () => {
          parseMethod(kebabToCamel(property) as any, value);
          parseMethod(camelToKebab(property) as any, value);
        });
      }
    });

    test("for an invalid property throws", () => {
      // @ts-expect-error
      expect(() => parseMethod("", "")).toThrowError();
      // @ts-expect-error
      expect(() => parseMethod("invalid", "")).toThrowError();
      // @ts-expect-error
      expect(() => parseMethod("invalid", "red")).toThrowError();
    });

    test("for an invalid value throws", () => {
      expect(() => parseMethod("background", "red")).not.toThrowError();
      expect(() => parseMethod("background", "")).toThrowError();
      expect(() => parseMethod("background", "invalid")).toThrowError();
    });
  });
}

createParseTests("`parse` method", (property, value) =>
  longhand.parse(property as any, value)
);
createParseTests("static `parse` method", (property, value) =>
  Longhand.parse(property as any, value)
);

describe("`style` object has at least one longhand", () => {
  shorthandProperties.forEach(({ property, value, unsupported }) => {
    if (unsupported?.value) {
      test.skip(`is skipped for \`${property}\` because it is not supported by \`jsdom\`.`, () => {
        expect(() =>
          longhand._getRawHTMLStyleWithPropertyAndValueApplied(
            kebabToCamel(property) as any,
            value
          )
        ).toThrowError(); // If this test fails, it means `jsdom` started supporting the property
      });
    } else {
      test(`for \`${property}\` \x1b[0m\x1b[2m(and value \`${value}\`)\x1b[22m\x1b[1m`, () => {
        const styles = getExpandedStyles(
          longhand._getRawHTMLStyleWithPropertyAndValueApplied(
            kebabToCamel(property) as any,
            value
          )
        );
        expect(
          Object.keys(styles.kebabCaseStyles).length,
          Object.entries(styles.kebabCaseStyles)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
        ).toBeGreaterThan(1);
      });
    }
  });
});
