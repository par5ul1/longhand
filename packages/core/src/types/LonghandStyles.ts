import { KebabCaseCSSStyleDeclaration } from "./CSSStyleDeclarations/KebabCaseCSSStyleDeclaration";
import { PropertyOnlyCSSStyleDeclaration } from "./CSSStyleDeclarations/PropertyOnlyCSSStyleDeclaration";

type NoNonStringsInValue<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
};

export type LonghandStyles = {
  kebabCaseStyles: Partial<NoNonStringsInValue<KebabCaseCSSStyleDeclaration>>;
  camelCaseStyles: Partial<
    NoNonStringsInValue<PropertyOnlyCSSStyleDeclaration>
  >;
};
