import React, { Suspense } from "react";
import "./App.css";

const Button = React.lazy(() => import("mfe_remote/RemoteButton"));
function App() {
  return (
    <Suspense fallback={<div>Loading remote...</div>}>
      <div className="App">
        <header className="App-header">
          <h2>MFE HOST</h2>
          <h4>Remote Component</h4>
          <Button />
        </header>
      </div>
    </Suspense>
  );
}

export default App;
