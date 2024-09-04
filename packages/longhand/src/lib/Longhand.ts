import { LonghandStylesProperty } from "../types";
import { LonghandOptions } from "../types/LonghandOptions";
import { camelToKebab } from "../utils/convertCases";
import getExpandedStyles from "../utils/getExpandedStyles";
import LonghandStyle from "./LonghandStyle";

// TODO: JSDoc
export default class Longhand {
  private readonly _options: LonghandOptions | undefined;

  constructor();
  constructor(options: typeof this._options);

  constructor(options?: typeof this._options) {
    if (typeof window === "undefined") {
      throw new Error(
        "`longhand` only works in the browser. See https://github.com/par5ul1/longhand for how to use it with a DOM emulator."
      );
    }

    this._options = options;
  }

  public get options(): LonghandOptions | undefined {
    return this._options;
  }

  public parse(property: LonghandStylesProperty, value: string) {
    if (value === "") {
      throw new Error(`Value cannot be empty.`);
    }

    const element = document.createElement("div");
    const style = element.style;

    // TODO: Test
    if (!(property in style)) {
      throw new Error(
        `Property "${String(property)}" is not a valid CSS property.`
      );
    }

    // TODO: Test
    const kebabCaseProperty = camelToKebab(property);

    style.setProperty(kebabCaseProperty, value);

    // TODO: Test
    if (style[property as keyof CSSStyleDeclaration] !== value) {
      throw new Error(
        `Value "${value}" is not a valid CSS value for property "${property}".`
      );
    }

    // TODO: Test empty string values
    return new LonghandStyle(
      property,
      value,
      getExpandedStyles(style, this.options?.ignoreInitial)
    );
  }

  public static parse(
    property: Parameters<Longhand["parse"]>[0],
    value: Parameters<Longhand["parse"]>[1],
    options?: Pick<LonghandOptions, "ignoreInitial">
  ) {
    const longhand = options ? new Longhand(options) : new Longhand();
    return longhand.parse(property, value);
  }
}
