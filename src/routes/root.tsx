import { Outlet, Link, useLocation } from "react-router-dom";
import './root.css';
import React from "react";
import { useTranslation } from "react-i18next";

function Root() {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <>
      <header className="top-navigation">
        <nav className="main-nav">
          <ul className="main-menu">
            <li><Link to="/summary" className={
              location.pathname.startsWith("/summary") ? "active" : ""
            }>{t("Nav.Summary")}</Link></li>
            <li><Link to="/find-paths" className={
              location.pathname.startsWith("/find-paths") ? "active" : ""
            }>{t("Nav.FindPaths")}</Link></li>
            <li><Link to="/about" className={
              location.pathname.startsWith("/about") ? "active" : ""
            }>{t("Nav.About")}</Link></li>
          </ul>
        </nav >
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default Root
