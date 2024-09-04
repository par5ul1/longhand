import { CamelToKebab } from "../../utils/convertCases";
import { PropertyOnlyCSSStyleDeclaration } from "./PropertyOnlyCSSStyleDeclaration";

export type KebabCaseCSSStyleDeclaration = Record<
  CamelToKebab<keyof PropertyOnlyCSSStyleDeclaration & string>,
  string
>;
