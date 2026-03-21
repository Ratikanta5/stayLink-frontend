import React, { createContext, useContext, useEffect, useState } from "react";

const TestimonialContext = createContext();

export const useTestimonials = () => useContext(TestimonialContext);

export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Mock data (realistic tone, not cringe)
  const mockTestimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      city: "Bangalore",
      text: "Found a room within 2 days. No broker hassle, everything was clear.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Verma",
      city: "Pune",
      text: "The matching system actually works. I got relevant options instantly.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Amit Kumar",
      city: "Hyderabad",
      text: "Saved a lot of time. No need to call multiple owners anymore.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      id: 4,
      name: "Sneha Patel",
      city: "Mumbai",
      text: "Clean UI and genuine listings. Much better than random WhatsApp groups.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      name: "Karan Mehta",
      city: "Delhi",
      text: "Direct owner contact is the best feature. No hidden charges.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ];

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setTestimonials(mockTestimonials);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <TestimonialContext.Provider value={{ testimonials, loading }}>
      {children}
    </TestimonialContext.Provider>
  );
};