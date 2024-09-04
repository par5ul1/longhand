import { KebabCaseCSSStyleDeclaration } from "../types/CSSStyleDeclarations/KebabCaseCSSStyleDeclaration";
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
    this._options = options;
  }

  public get options(): LonghandOptions | undefined {
    return this._options;
  }

  public parse(
    property: (keyof CSSStyleDeclaration | keyof KebabCaseCSSStyleDeclaration) &
      string,
    value: string
  ) {
    // TODO: Test
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error(
        "`@longhand/core` only works in the browser. `@longhand/virtualized` might be what you're looking for."
      );
    }

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
