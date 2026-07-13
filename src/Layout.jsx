import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => (
  <div className="min-h-screen bg-page-bg flex flex-col">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;