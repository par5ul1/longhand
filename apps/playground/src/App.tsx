import { useState } from "react";

function App() {
  const [ignoreInitial, setIgnoreInitial] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center">
      <h1 className="text-3xl font-bold">Longhand Playground</h1>
      <div className="flex gap-2 flex-col">
        <b>Options</b>
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={ignoreInitial}
            onChange={(e) => setIgnoreInitial(e.target.checked)}
          />
          Ignore Initial
        </label>
      </div>
    </div>
  );
}

export default App;
