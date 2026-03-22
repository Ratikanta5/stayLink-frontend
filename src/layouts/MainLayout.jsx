import React from "react";
import Nav from "../components/nav/Nav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <ScrollToTop />

      {/* 🔥 TRANSPARENT NAV */}
      <header className="h-16 fixed top-0 left-0 w-full z-50 bg-transparent">
        <Nav />
      </header>

      {/* 🔥 CONTENT */}
      <div className="flex-grow w-full">
        {isHome ? (
          // ✅ Hero page (nav overlays)
          <Outlet />
        ) : (
          // ✅ Other pages (push content down)
          <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        )}
      </div>

      {/* 🔥 FOOTER */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Footer />
        </div>
      </footer>
    </main>
  );
};

export default MainLayout;
