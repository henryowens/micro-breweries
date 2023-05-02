import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import router from "./router/Index";
import theme from "./style/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export default root.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ChakraProvider theme={{ ...theme }}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
