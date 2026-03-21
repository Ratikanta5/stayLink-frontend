import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f2a3d] text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            StayLink
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Find verified rooms, connect directly with owners, and simplify your rental journey.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* TENANTS */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            For Tenants
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/listings" className="hover:text-white transition">
                Find Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-requests" className="hover:text-white transition">
                My Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-white transition">
                Help & Support
              </NavLink>
            </li>
          </ul>
        </div>

        {/* OWNERS */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            For Owners
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/list-property" className="hover:text-white transition">
                List Property
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-requests" className="hover:text-white transition">
                View Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-white transition">
                Owner Support
              </NavLink>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className="hover:text-white transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-white transition">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacy" className="hover:text-white transition">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="hover:text-white transition">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* CONTACT + NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Stay Updated
          </h3>

          {/* Newsletter */}
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-white/10 border border-white/20 text-sm focus:outline-none"
            />
            <button className="bg-white text-[#0f2a3d] px-4 py-2 rounded-r-md text-sm font-medium hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>

          {/* Contact */}
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FiMail /> support@staylink.com
            </li>
            <li className="flex items-center gap-2">
              <FiPhone /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin /> India
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} StayLink. All rights reserved.</p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <NavLink to="/privacy" className="hover:text-white">
            Privacy
          </NavLink>
          <NavLink to="/terms" className="hover:text-white">
            Terms
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;