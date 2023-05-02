import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/Default";

const HomeRoute = lazy(() => import("./routes/Home"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeRoute />
        </Suspense>
      </DefaultLayout>
    ),
  },
]);

export default router;
