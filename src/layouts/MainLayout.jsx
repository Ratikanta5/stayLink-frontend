import React from "react";
import Nav from "../components/nav/Nav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  const location = useLocation();

  // Pages that need full width (like Home with Hero)
  const isHome = location.pathname === "/";

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <Nav />
      </header>

      {/* Page Content */}
      <div className="flex-grow w-full">
        {isHome ? (
          // Full width for Hero page
          <Outlet />
        ) : (
          // Boxed layout for other pages
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Footer />
        </div>
      </footer>
    </main>
  );
};

export default MainLayout;
