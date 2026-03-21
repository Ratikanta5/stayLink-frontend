import React, { createContext, useContext, useState, useEffect } from "react";

// create context
const RoomContext = createContext();

// custom hook (clean access)
export const useRooms = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockRooms = [
    {
      id: 1,
      title: "1BHK near Tech Park",
      city: "Bhubaneswar",
      price: 8000,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    {
      id: 2,
      title: "PG for Boys",
      city: "Bangalore",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    },
    {
      id: 3,
      title: "Studio Apartment",
      city: "Pune",
      price: 10000,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    },
    {
      id: 4,
      title: "Shared Flat",
      city: "Hyderabad",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    },

    // 🔥 New entries
    {
      id: 5,
      title: "2BHK Family Apartment",
      city: "Mumbai",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    {
      id: 6,
      title: "Single Room PG",
      city: "Delhi",
      price: 7000,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    },
    {
      id: 7,
      title: "Luxury Studio Apartment",
      city: "Bangalore",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
    {
      id: 8,
      title: "Affordable Shared Room",
      city: "Pune",
      price: 4000,
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800",
    },
    {
      id: 9,
      title: "1RK Budget Room",
      city: "Kolkata",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
    },
    {
      id: 10,
      title: "Furnished 1BHK",
      city: "Hyderabad",
      price: 9000,
      image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
    },
    {
      id: 11,
      title: "Co-living Space",
      city: "Chennai",
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
    },
    {
      id: 12,
      title: "Premium Flat near IT Hub",
      city: "Noida",
      price: 14000,
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    },
    {
      id: 13,
      title: "Hostel Style Room",
      city: "Jaipur",
      price: 3000,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
    },
    {
      id: 14,
      title: "2BHK Shared Apartment",
      city: "Ahmedabad",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    },
    {
      id: 15,
      title: "Compact Studio Room",
      city: "Indore",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    },
  ];

  // simulate API fetch
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setRooms(mockRooms);
      setLoading(false);
    }, 800); // fake delay
  }, []);

  return (
    <RoomContext.Provider value={{ rooms, loading }}>
      {children}
    </RoomContext.Provider>
  );
};
