import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ProductDetail from "./components/ProductDetail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:id", element: <ProductDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;