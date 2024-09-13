import { LonghandStylesProperty } from "../types";
import { LonghandOptions } from "../types/LonghandOptions";
import { camelToKebab } from "../utils/convertCases";
import getExpandedStyles from "../utils/getExpandedStyles";
import LonghandStyle from "./LonghandStyle";

/**
 * The Longhand class. Handles parsing CSS properties into their longhand equivalents.
 * @returns {Longhand} The Longhand class instance.
 */
export default class Longhand {
  /**
   * This should not be used directly. Use the {@link options} getter instead.
   * @private
   * @readonly
   */
  private readonly _options: LonghandOptions | undefined;

  /**
   * Creates a new instance of the Longhand class with no options.
   * @constructor
   */
  constructor();
  /**
   * Creates a new instance of the Longhand class with the given options.
   * @constructor
   * @param {LonghandOptions} [options] - The {@link LonghandOptions | options} for the Longhand class.
   */
  constructor(options: typeof this._options);

  constructor(options?: typeof this._options) {
    if (typeof window === "undefined") {
      throw new Error(
        "`longhand` only works in the browser. See https://github.com/par5ul1/longhand for how to use it with a DOM emulator."
      );
    }

    this._options = options;
  }

  /**
   * @returns The options for the Longhand class.
   */
  public get options(): LonghandOptions | undefined {
    return this._options;
  }

  /**
   * Internal method for the Longhand class. Gets the raw HTML style with the given property and value applied.
   * @param property - The CSS property to apply.
   * @param value - The value to apply.
   * @note This method is used internally by the {@link parse} method. While it is public, it will likely never be used directly.
   */
  public _getRawHTMLStyleWithPropertyAndValueApplied(
    property: LonghandStylesProperty,
    value: string
  ) {
    if (value === "") {
      throw new Error(`Value cannot be empty.`);
    }

    const element = document.createElement("div");
    const style = element.style;

    if (!(property in style)) {
      throw new Error(
        `Property \`${String(property)}\` is not a valid CSS property.`
      );
    }

    const kebabCaseProperty = camelToKebab(property);

    style.setProperty(kebabCaseProperty, value);

    if (
      style[kebabCaseProperty as keyof CSSStyleDeclaration]?.toString()
        .length === 0
    ) {
      throw new Error(
        `Value \`${value}\` is not a valid CSS value for property \`${property}\`.`
      );
    }

    return style;
  }

  /**
   * The parser method for the Longhand class. Parses a CSS property into its longhand equivalent, given a value.
   * @param property - The CSS property to parse. Can be a camelCase or kebab-case.
   * @param value - The value to parse.
   * @returns The parsed style as an instance of the {@link LonghandStyle} class.
   */
  public parse(property: LonghandStylesProperty, value: string) {
    return new LonghandStyle(
      property,
      value,
      getExpandedStyles(
        this._getRawHTMLStyleWithPropertyAndValueApplied(property, value),
        this.options?.ignoreInitial
      )
    );
  }

  /**
   * Static method for the {@link Longhand.prototype.parse} method.
   * @param options - The {@link LonghandOptions | options} for the Longhand class.
   * @see {@link Longhand.prototype.parse}
   */
  public static parse(
    property: Parameters<Longhand["parse"]>[0],
    value: Parameters<Longhand["parse"]>[1],
    options?: Pick<LonghandOptions, "ignoreInitial">
  ) {
    const longhand = options ? new Longhand(options) : new Longhand();
    return longhand.parse(property, value);
  }
}
