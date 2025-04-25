/* eslint-disable react/prop-types */
import "./Layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {

    const location = useLocation();

    const getPageClass = () => {
      if (location.pathname === "/") return "layout-content home";
      if (location.pathname === "/perfil") return "layout-content profile";
      if (location.pathname === "/quiz") return "layout-content quiz";
      if (location.pathname === "/diseases") return "layout-content diseases";
      if (location.pathname === "/3D-explore") return "layout-content explore";
      return "layout-content";
    };


  return (
    <div className="layout">
        <Header />
      <main className={getPageClass()}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;