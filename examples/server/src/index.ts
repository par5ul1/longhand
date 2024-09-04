import { Hono } from "hono";
import { JSDOM } from "jsdom";
import { Longhand } from "longhand";
import { LonghandStylesProperty } from "longhand/types";

const app = new Hono();

type Casing = "camel" | "kebab" | "mixed";

const dom = new JSDOM("<!DOCTYPE html>");
// @ts-expect-error
global.window = dom.window;
global.document = dom.window.document;

const longhand = new Longhand();

app.get("/:property/:value/styles", (c) => {
  const casing = c.req.query("casing") as Casing;
  const property = c.req.param("property") as LonghandStylesProperty;
  const value = c.req.param("value");

  const parsed = longhand.parse(property, value);

  return c.json(
    casing === "camel"
      ? parsed.camelCaseStyles
      : casing === "kebab"
      ? parsed.kebabCaseStyles
      : parsed.styles
  );
});

app.get("/:property/:value/properties", async (c) => {
  const casing = c.req.query("casing") as Casing;
  const property = c.req.param("property") as LonghandStylesProperty;
  const value = c.req.param("value");

  const parsed = longhand.parse(property, value);

  return c.json(
    casing === "camel"
      ? parsed.camelCaseProperties
      : casing === "kebab"
      ? parsed.kebabCaseProperties
      : parsed.properties
  );
});

export default app;
