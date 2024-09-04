import { LonghandStyles } from "../types/LonghandStyles";
import { kebabToCamel } from "./convertCases";

export default function getExpandedStyles(
  styles: CSSStyleDeclaration,
  ignoreInitial: boolean = false
): LonghandStyles {
  const filteredStyles: LonghandStyles = {
    kebabCaseStyles: {},
    camelCaseStyles: {},
  };

  for (let i = 0; i < styles.length; i++) {
    const prop = styles.item(i); // Always in Kebab Case (see https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue#property)
    const value = styles.getPropertyValue(prop);

    if (!!value && (!ignoreInitial || value !== "initial")) {
      (filteredStyles.kebabCaseStyles as any)[prop] = value;
      (filteredStyles.camelCaseStyles as any)[kebabToCamel(prop)] = value;
    }
  }

  return filteredStyles;
}
