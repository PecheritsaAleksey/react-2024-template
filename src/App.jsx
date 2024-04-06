import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./providers/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Layout>
          <Outlet />
        </Layout>
      </ErrorBoundary>
    </>
  );
}

export default App;
