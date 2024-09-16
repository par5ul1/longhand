import { useEffect, useState } from "react";

import { Longhand } from "longhand";
import { LonghandStyle } from "longhand/types";

function App() {
  const [property, setProperty] = useState("margin");
  const [value, setValue] = useState("10px");
  const [ignoreInitial, setIgnoreInitial] = useState(false);

  const [result, setResult] = useState<
    LonghandStyle | { error?: string } | null
  >(null);

  useEffect(() => {
    try {
      const longhand = new Longhand({ ignoreInitial });
      const parsed = longhand.parse(property as any, value);
      setResult(parsed);
    } catch (error) {
      setResult({ error: (error as Error).message });
    }
  }, [property, value, ignoreInitial]);

  return (
    <div className="w-screen flex min-h-screen flex-col gap-8 items-center justify-start p-8 bg-white dark:bg-zinc-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold">Longhand Sandbox</h1>

      <div className="grid gap-4 w-full max-w-2xl grid-cols-2">
        <h2 className="text-xl font-semibold col-span-2">Input</h2>
        <fieldset className="border-[1px] border-gray-200 rounded-md">
          <legend className="ml-2 px-1">Property</legend>
          <input
            type="text"
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            placeholder="e.g. background, margin, etc."
            className="border-none outline-none p-2 font-mono w-full bg-transparent text-inherit"
          />
        </fieldset>
        <fieldset className="border-[1px] border-gray-200 rounded-md">
          <legend className="ml-2 px-1">Value</legend>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 10px 20px, 10%, etc."
            className="border-none outline-none p-2 font-mono w-full bg-transparent text-inherit"
          />
        </fieldset>
        <details className="border-[1px] border-gray-200 rounded-md p-2 col-span-2">
          <summary className="text-md font-semibold">Options</summary>
          <label className="flex gap-2 items-center mt-2">
            <input
              type="checkbox"
              checked={ignoreInitial}
              onChange={(e) => setIgnoreInitial(e.target.checked)}
            />
            Ignore <code>initial</code>
          </label>
        </details>
      </div>

      {result && "properties" in result && (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          <h2 className="text-xl font-semibold">Results</h2>
          <div>
            <strong>Original Property: </strong>{" "}
            <code>{result.originalProperty}</code>
          </div>
          <div>
            <strong>Original Value: </strong>{" "}
            <code>{result.originalValue}</code>
          </div>
          <hr />
          <div>
            <strong>Longhand Properties</strong>
            <br />
            <span className="text-sm text-gray-500">
              ({result.length} properties)
            </span>
            <div className="flex flex-col gap-2 mt-2">
              <em>camelCase</em>
              <pre className="bg-gray-100 dark:bg-zinc-800 p-2 rounded mt-2 text-white dark:text-zinc-300">
                {result.camelCaseProperties.join("\n")}
              </pre>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <em>kebab-case</em>
              <pre className="bg-gray-100 dark:bg-zinc-800 p-2 rounded mt-2 text-white dark:text-zinc-300">
                {result.kebabCaseProperties.join("\n")}
              </pre>
            </div>
          </div>
          <hr />
          <div>
            <strong>Implicit Styles</strong>
            <div className="flex flex-col gap-2 mt-2">
              <em>camelCase</em>
              <pre className="bg-gray-100 dark:bg-zinc-800 p-2 rounded mt-2 text-white dark:text-zinc-300">
                {result.toCamelCaseString()}
              </pre>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <em>kebab-case</em>
              <pre className="bg-gray-100 dark:bg-zinc-800 p-2 rounded mt-2 text-white dark:text-zinc-300">
                {result.toKebabCaseString()}
              </pre>
            </div>
          </div>
        </div>
      )}

      {result && "error" in result && (
        <div className="text-red-500">
          <strong>Error:</strong> {result.error}
        </div>
      )}
    </div>
  );
}

export default App;
