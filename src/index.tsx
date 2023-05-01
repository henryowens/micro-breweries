import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export default root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
