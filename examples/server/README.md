# Longhand Server Example

This is a simple server-based example application demonstrating the usage of Longhand.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. Run the development server:
   ```sh
   npm run start
   # or
   pnpm start
   # or
   yarn start
   ```

3. The server will start, and you can interact with it using API requests.

## Endpoints

### `/:property/:value/styles`

#### GET `/:property/:value/styles`

This endpoint parses a CSS property and value using Longhand and returns the parsed styles.

Query Parameters:
- `casing` (optional): Determines the casing of the returned styles. Possible values are:
  - `camel`: Returns styles in camelCase
  - `kebab`: Returns styles in kebab-case
  - `mixed` (default): Returns styles in their original casing

Path Parameters:
- `property`: The CSS property to parse (e.g., `background`, `border`, etc.)
- `value`: The value for the CSS property

Returns: JSON object containing the parsed styles

Example Request:

```
GET /background/red/styles?casing=camel
```

Example Response:

```json
{
  "backgroundColor": "red"
}
```

### `/:property/:value/properties`

#### GET `/:property/:value/properties`

This endpoint parses a CSS property and value using Longhand and returns the parsed properties.

Query Parameters:
- `casing` (optional): Determines the casing of the returned properties. Possible values are:
  - `camel`: Returns properties in camelCase
  - `kebab`: Returns properties in kebab-case
  - `mixed` (default): Returns properties in their original casing

Path Parameters:
- `property`: The CSS property to parse (e.g., `background`, `border`, etc.)
- `value`: The value for the CSS property

Returns: JSON array containing the parsed properties

Example Request:

```
GET /background/red/properties?casing=camel
```

Example Response:

```json
[
  "backgroundColor"
]
```

## More Information

For more details on using Longhand, refer to the [main project documentation](../../README.md). This example also showcases the limitations outlined in the [Limitations section](../../README.md#limitations) of the `longhand` package.
