type CSSPropertyKeys<T> = {
  [K in keyof T]: K extends string ? K : never;
}[keyof T];

export type PropertyOnlyCSSStyleDeclaration = Pick<
  CSSStyleDeclaration,
  CSSPropertyKeys<CSSStyleDeclaration>
>;
