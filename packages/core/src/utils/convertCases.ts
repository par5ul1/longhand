export function kebabToCamel(kebab: string): string {
  return kebab.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export function camelToKebab(camel: string): string {
  return camel.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, offset) => (offset ? "-" : "") + $.toLowerCase()
  );
}

export type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${CamelToKebab<U>}`
    : `${Uncapitalize<T>}-${CamelToKebab<U>}`
  : "";

export type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
  ? `${Lowercase<T>}${Capitalize<KebabToCamel<U>>}`
  : Lowercase<S>;
