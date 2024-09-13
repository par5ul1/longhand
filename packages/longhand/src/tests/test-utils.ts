import { JSDOM } from "jsdom";

export const createWindow = () => {
  const dom = new JSDOM("<!DOCTYPE html>");
  // @ts-expect-error
  global.window = dom.window;
  global.document = dom.window.document;
};
