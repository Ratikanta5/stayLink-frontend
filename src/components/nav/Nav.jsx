import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
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

  const dropdownRef = useRef();
  const debounceRef = useRef();

  const { location, setLocation } = useLocation();

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    scrolled
      ? isActive
        ? "text-black font-semibold"
        : "text-gray-700 hover:text-black transition"
      : isActive
        ? "text-white font-semibold"
        : "text-gray-200 hover:text-white transition";

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

  // SEARCH WITH DEBOUNCE
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

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* FLEX (mobile) → GRID (desktop) */}
          <div className="flex md:grid md:grid-cols-3 items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span
                className={`text-xl font-semibold ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                StayLink Rudra
              </span>
            </NavLink>

            {/* Center Links */}
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

            {/* Right Section */}
            <div className="flex items-center justify-end gap-4 relative ml-auto md:ml-0">
              {/* LOCATION BUTTON */}
              <div
                onClick={() => setShowInput(!showInput)}
                className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition shadow-sm w-[180px] overflow-hidden ${
                  scrolled
                    ? "bg-gray-100 hover:bg-gray-200 text-black"
                    : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                }`}
              >
                <FiMapPin className="text-lg shrink-0" />

                <div className="flex flex-col leading-tight w-full overflow-hidden">
                  <span className="text-xs opacity-80 whitespace-nowrap">
                    Location
                  </span>

                  <span
                    title={location?.city}
                    className="text-sm font-medium truncate w-full"
                  >
                    {location?.city && location.city !== "Unknown"
                      ? location.city
                      : "Set location"}
                  </span>
                </div>
              </div>

              {/* DROPDOWN */}
              {showInput && (
                <div
                  ref={dropdownRef}
                  className="absolute top-16 right-0 bg-white shadow-2xl p-4 rounded-xl w-80 z-50 border"
                >
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#0f2a3d]"
                  />

                  <div className="min-h-[150px] max-h-52 overflow-y-auto">
                    {loading && (
                      <div className="space-y-2">
                        {[1, 2, 3].map((_, i) => (
                          <div
                            key={i}
                            className="h-4 bg-gray-200 rounded animate-pulse"
                          />
                        ))}
                      </div>
                    )}

                    {!loading && results.length === 0 && query.length > 1 && (
                      <p className="text-sm text-gray-400">No results found</p>
                    )}

                    {!loading &&
                      results.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setLocation(item);
                            setShowInput(false);
                            setQuery("");
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm rounded transition"
                        >
                          {item.fullAddress}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Sign In */}
              <NavLink
                to="/login"
                className={`hidden sm:block ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Sign In
              </NavLink>

              {/* CTA */}
              <NavLink
                to="/list-property"
                className={`px-4 py-2 rounded-full text-sm transition ${
                  scrolled
                    ? "bg-[#0f2a3d] text-white hover:bg-[#0c2232]"
                    : "bg-white text-[#0f2a3d] hover:bg-gray-200"
                }`}
              >
                List Your Space
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden text-2xl ${
                  scrolled ? "text-black" : "text-white"
                }`}
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
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4 mt-16">
          <NavLink to="/" className="block text-gray-700">
            Home
          </NavLink>
          <NavLink to="/listings" className="block text-gray-700">
            Listings
          </NavLink>
          <NavLink to="/my-requests" className="block text-gray-700">
            My Requests
          </NavLink>
          <NavLink to="/contact" className="block text-gray-700">
            Contact
          </NavLink>
          <NavLink to="/login" className="block text-gray-700">
            Sign In
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
