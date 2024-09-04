import { camelToKebab, kebabToCamel } from "./convertCases";

import { LonghandStyles } from "../types/LonghandStyles";

export default function getExpandedStyles(
  styles: CSSStyleDeclaration,
  ignoreInitial: boolean = false
): LonghandStyles {
  const filteredStyles: LonghandStyles = {
    kebabCaseStyles: {},
    camelCaseStyles: {},
  };

  const values =
    "_values" in styles
      ? Object.keys(styles._values as Record<string, string>) // JSDOM does not emulate CSSStyleDeclaration properly so we need a workaround
      : Array(styles.length)
          .fill(null)
          .map((_, i) => styles.item(i));

  for (let prop of values) {
    const value = styles.getPropertyValue(prop);

    if (!!value && (!ignoreInitial || value !== "initial")) {
      (filteredStyles.kebabCaseStyles as any)[camelToKebab(prop)] = value;
      (filteredStyles.camelCaseStyles as any)[kebabToCamel(prop)] = value;
    }
  }

  return filteredStyles;
}
