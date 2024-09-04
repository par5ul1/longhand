import { KebabCaseCSSStyleDeclaration } from "../types/CSSStyleDeclarations/KebabCaseCSSStyleDeclaration";
import { LonghandStyles } from "../types/LonghandStyles";
import { kebabToCamel } from "../utils/convertCases";

// TODO: JSDoc
// TODO: Test all getters
export default class LonghandStyle {
  private readonly _originalProperty: (
    | keyof CSSStyleDeclaration
    | keyof KebabCaseCSSStyleDeclaration
  ) &
    string;
  private readonly _originalValue: string;
  private readonly _styles: LonghandStyles;

  constructor(
    originalProperty: typeof this._originalProperty,
    originalValue: typeof this._originalValue,
    styles: typeof this._styles
  ) {
    this._originalProperty = originalProperty;
    this._originalValue = originalValue;
    this._styles = styles;
  }

  public get originalProperty() {
    return this._originalProperty;
  }

  public get originalValue() {
    return this._originalValue;
  }

  public get kebabCaseStyles() {
    return Object.fromEntries(
      Object.entries(this._styles.kebabCaseStyles).filter(
        ([key]) => key !== this._originalProperty
      )
    );
  }
  public get kebabCaseProperties() {
    return Object.keys(this.kebabCaseStyles);
  }

  public get camelCaseStyles() {
    return Object.fromEntries(
      Object.entries(this._styles.camelCaseStyles).filter(
        ([key]) => key !== kebabToCamel(this._originalProperty)
      )
    );
  }
  public get camelCaseProperties() {
    return Object.keys(this.camelCaseStyles);
  }

  public get styles() {
    return {
      ...this.kebabCaseStyles,
      ...this.camelCaseStyles,
    };
  }
  public get properties() {
    return [...this.kebabCaseProperties, ...this.camelCaseProperties];
  }

  public isValidLonghandProperty(property: string) {
    return this.properties.includes(property);
  }

  public get length() {
    return this.properties.length / 2; // To account for the camelCase and kebabCase properties
  }

  toString() {
    return JSON.stringify(this.styles, null, 2);
  }
}

export type { LonghandStyle };
