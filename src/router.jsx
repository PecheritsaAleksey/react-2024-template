import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Auth from "./pages/Auth";
import ToDos from "./pages/ToDos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<ToDos />} />
      </Route>
      <Route path="/login" element={<Auth />} />
    </>
  )
);

export default router;
