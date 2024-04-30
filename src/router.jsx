import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import ToDos from "./pages/ToDos";

const routerConfig = [
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: ToDos,
        path: "/",
      },
    ],
  },
  {
    Component: Auth,
    path: "/login",
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
