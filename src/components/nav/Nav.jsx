import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation as useRouterLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useLocation } from "../../contexts/locationContext/LocationContext";
import { getUserLocation } from "../../utils/getLocation";
import { FiMapPin } from "react-icons/fi";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 NEW: dynamic contrast state
  const [isDarkBg, setIsDarkBg] = useState(true);

  const dropdownRef = useRef();
  const debounceRef = useRef();

  const { location, setLocation } = useLocation();

  const routerLocation = useRouterLocation();
  const isHome = routerLocation.pathname === "/";

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // 🔥 detect background brightness
      const hero = document.querySelector("section"); // assumes hero section is first
      if (hero) {
        const style = window.getComputedStyle(hero);
        const bg = style.backgroundColor;

        if (bg) {
          const rgb = bg.match(/\d+/g);
          if (rgb) {
            const brightness =
              (parseInt(rgb[0]) * 299 +
                parseInt(rgb[1]) * 587 +
                parseInt(rgb[2]) * 114) /
              1000;

            setIsDarkBg(brightness < 128);
          }
        }
      }
    };

    handleScroll(); // run once
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NAV LINK STYLE
  const navLinkClass = ({ isActive }) =>
    isHome && !scrolled
      ? isActive
        ? "text-white font-semibold"
        : "text-gray-200 hover:text-white transition"
      : isActive
        ? "text-black font-semibold"
        : "text-gray-700 hover:text-black transition";

  // AUTO LOCATION
  useEffect(() => {
    if (location && location.city && location.city !== "Set location") return;

    getUserLocation()
      .then((data) => setLocation(data))
      .catch(() =>
        setLocation({
          lat: null,
          lng: null,
          area: "",
          city: "Set location",
          state: "",
          country: "",
          fullAddress: "",
        }),
      );
  }, [location, setLocation]);

  // CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // SEARCH
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: trimmedQuery,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          },
        );

        const mapped = res.data.map((item) => ({
          lat: item.lat,
          lng: item.lon,
          area: item.address.suburb || "",
          city:
            item.address.city ||
            item.address.town ||
            item.address.village ||
            item.address.county ||
            item.address.state_district ||
            "Unknown",
          state: item.address.state || "",
          country: item.address.country || "",
          fullAddress: item.display_name,
        }));

        setResults(mapped);
      } catch (err) {
        console.error("Search error:", err);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // 🔥 dynamic color
  const dynamicTextColor =
    isHome && !scrolled
      ? isDarkBg
        ? "text-white"
        : "text-black"
      : "text-black";

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          isHome
            ? scrolled
              ? "bg-white shadow-md md:bg-white/90 md:backdrop-blur-md"
              : "bg-transparent"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex md:grid md:grid-cols-3 items-center h-16">
            {/* LOGO */}
            <NavLink to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className={`text-xl font-semibold ${dynamicTextColor}`}>
                StayLink
              </span>
            </NavLink>

            {/* CENTER LINKS */}
            <div className="hidden md:flex justify-center gap-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/listings" className={navLinkClass}>
                Listings
              </NavLink>
              <NavLink to="/my-requests" className={navLinkClass}>
                My Requests
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-4 relative ml-auto md:ml-0">
              {/* LOCATION DESKTOP */}
              <div
                onClick={() => setShowInput(!showInput)}
                className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition shadow-sm w-[180px] overflow-hidden ${
                  isHome && !scrolled
                    ? "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
              >
                <FiMapPin />
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="text-xs">Location</span>
                  <span className="text-sm font-medium truncate">
                    {location?.city && location.city !== "Unknown"
                      ? location.city
                      : "Set location"}
                  </span>
                </div>
              </div>

              {/* SIGN IN */}
              <NavLink
                to="/login"
                className={`hidden sm:block ${dynamicTextColor}`}
              >
                Sign In
              </NavLink>

              {/* CTA */}
              <NavLink
                to="/list-property"
                className={`px-4 py-2 rounded-full text-sm ${
                  isHome && !scrolled
                    ? "bg-white text-[#0f2a3d]"
                    : "bg-[#0f2a3d] text-white"
                }`}
              >
                List Your Space
              </NavLink>

              {/* MOBILE MENU BUTTON */}
              <button
                className={`md:hidden text-2xl ${dynamicTextColor}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-md px-4 py-4 space-y-4 z-40">
          {/* LOCATION MOBILE */}
          <div
            onClick={() => setShowInput(!showInput)}
            className="flex items-center gap-2 border p-2 rounded"
          >
            <FiMapPin />
            <span>
              {location?.city && location.city !== "Unknown"
                ? location.city
                : "Set location"}
            </span>
          </div>

          {showInput && (
            <div className="border p-2 rounded">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border px-2 py-1 mb-2"
              />
              {results.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setLocation(item);
                    setShowInput(false);
                  }}
                  className="p-1 text-sm cursor-pointer"
                >
                  {item.fullAddress}
                </div>
              ))}
            </div>
          )}

          <NavLink to="/" className="block">
            Home
          </NavLink>
          <NavLink to="/listings" className="block">
            Listings
          </NavLink>
          <NavLink to="/my-requests" className="block">
            My Requests
          </NavLink>
          <NavLink to="/contact" className="block">
            Contact
          </NavLink>
          <NavLink to="/login" className="block">
            Sign In
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
