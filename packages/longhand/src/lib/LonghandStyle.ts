import {
  LonghandStyles,
  LonghandStylesProperty,
} from "../types/LonghandStyles";

import { kebabToCamel } from "../utils/convertCases";

/**
 * The LonghandStyle class. Represents a parsed CSS property, its value, and all its longhand components.
 * @returns {LonghandStyle} The LonghandStyle class instance.
 */
export default class LonghandStyle {
  /**
   * This should not be used directly. Use the {@link originalProperty} getter instead.
   * @private
   * @readonly
   */
  private readonly _originalProperty: LonghandStylesProperty;
  /**
   * This should not be used directly. Use the {@link originalValue} getter instead.
   * @private
   * @readonly
   */
  private readonly _originalValue: string;
  /**
   * This should not be used directly. Use the {@link styles}, {@link kebabCaseStyles}, or {@link camelCaseStyles} getters instead.
   * @private
   * @readonly
   */
  private readonly _originalStyles: LonghandStyles;

  /**
   * Creates a new instance of the LonghandStyle class.
   * @constructor
   * @param {LonghandStylesProperty} originalProperty - The original (shorthand) property of the parsed style.
   * @param {string} originalValue - The original (shorthand) value of the parsed style.
   * @param {LonghandStyles} originalStyles - The parsed {@link LonghandStyles | styles}.
   */
  constructor(
    originalProperty: typeof this._originalProperty,
    originalValue: typeof this._originalValue,
    originalStyles: typeof this._originalStyles
  ) {
    this._originalProperty = originalProperty;
    this._originalValue = originalValue;
    this._originalStyles = originalStyles;
  }

  /**
   * @returns {LonghandStylesProperty} The original (shorthand) property of the parsed style.
   */
  public get originalProperty() {
    return this._originalProperty;
  }

  /**
   * @returns {string} The original (shorthand) value of the parsed style.
   */
  public get originalValue() {
    return this._originalValue;
  }

  /**
   * @returns The parsed longhand styles as a map of kebab-cased properties to their values
   * @returns An empty map if the original property has no longhand equivalents.
   */
  public get kebabCaseStyles() {
    return Object.fromEntries(
      Object.entries(this._originalStyles.kebabCaseStyles).filter(
        ([key]) => key !== this._originalProperty
      )
    ) as Readonly<
      Record<keyof typeof this._originalStyles.kebabCaseStyles & string, string>
    >;
  }
  /**
   * @returns {string[]} The parsed longhand properties as an array of kebab-cased properties
   * @returns An empty array if the original property has no longhand equivalents.
   */
  public get kebabCaseProperties() {
    return Object.keys(this.kebabCaseStyles);
  }

  /**
   * @returns The parsed longhand styles as a map of camelCased properties to their values
   * @returns An empty map if the original property has no longhand equivalents.
   */
  public get camelCaseStyles() {
    return Object.fromEntries(
      Object.entries(this._originalStyles.camelCaseStyles).filter(
        ([key]) => key !== kebabToCamel(this._originalProperty)
      )
    ) as Readonly<
      Record<keyof typeof this._originalStyles.camelCaseStyles & string, string>
    >;
  }
  /**
   * @returns {string[]} The parsed longhand properties as an array of camelCased properties
   * @returns An empty array if the original property has no longhand equivalents.
   */
  public get camelCaseProperties() {
    return Object.keys(this.camelCaseStyles);
  }

  /**
   * @returns The parsed longhand styles as a map of both camelCased and kebab-cased properties to their values
   * @returns An empty map if the original property has no longhand equivalents.
   */
  public get styles() {
    return {
      ...this.kebabCaseStyles,
      ...this.camelCaseStyles,
    };
  }
  /**
   * @returns {string[]} The parsed longhand properties as an array of both camelCased and kebab-cased properties
   * @returns An empty array if the original property has no longhand equivalents.
   */
  public get properties() {
    return [...this.kebabCaseProperties, ...this.camelCaseProperties];
  }

  /**
   * Checks if a property is a valid longhand property for the original property.
   * @param {string} property - The property to check.
   * @returns {boolean} Whether the property is a valid longhand property for the original property.
   */
  public isValidLonghandProperty(property: string) {
    return this.properties.includes(property);
  }

  /**
   * @returns {number} The length of the parsed longhand properties
   * @returns 0 if the original property has no longhand equivalents.
   */
  public get length() {
    return this.properties.length / 2; // To account for the camelCase and kebabCase properties
  }

  /**
   * Converts and formats the parsed longhand styles to a string.
   * @returns {string} The formatted string representation of the parsed longhand styles.
   */
  toString() {
    return JSON.stringify(this.styles, null, 2);
  }
  /**
   * Converts and formats the parsed longhand styles to a camelCase string.
   * @returns {string} The formatted camelCase string representation of the parsed longhand styles.
   */
  toCamelCaseString() {
    return JSON.stringify(this.camelCaseStyles, null, 2);
  }
  /**
   * Converts and formats the parsed longhand styles to a kebab-case string.
   * @returns {string} The formatted kebab-case string representation of the parsed longhand styles.
   */
  toKebabCaseString() {
    return JSON.stringify(this.kebabCaseStyles, null, 2);
  }
}

export type { LonghandStyle };
