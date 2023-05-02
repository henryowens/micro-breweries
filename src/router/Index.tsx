import { Flex, Spinner } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { FullSpinner } from "../components";
import DefaultLayout from "./layouts/Default";

const HomeRoute = lazy(() => import("./routes/ui/Home"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Suspense fallback={<FullSpinner />}>
          <HomeRoute />
        </Suspense>
      </DefaultLayout>
    ),
  },
]);

export default router;
