import { KebabCaseCSSStyleDeclaration } from "./CSSStyleDeclarations/KebabCaseCSSStyleDeclaration";
import { PropertyOnlyCSSStyleDeclaration } from "./CSSStyleDeclarations/PropertyOnlyCSSStyleDeclaration";

type NoNonStringsInValue<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
};

export type LonghandStyles = {
  kebabCaseStyles: NonNullable<
    Partial<NoNonStringsInValue<KebabCaseCSSStyleDeclaration>>
  >;
  camelCaseStyles: NonNullable<
    Partial<NoNonStringsInValue<PropertyOnlyCSSStyleDeclaration>>
  >;
};

export type LonghandStylesProperty = (
  | keyof CSSStyleDeclaration
  | keyof KebabCaseCSSStyleDeclaration
) &
  string;
