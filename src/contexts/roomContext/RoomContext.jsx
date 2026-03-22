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
      _id: "1",
      title: "Cozy 4 Room Apartment",
      description: "Beautiful apartment with AC",
      propertyType: "Apartment",
      roomType: "Double",
      location: { area: "Banjara Hills", lat: 17.385, lng: 78.4867 },
      preferredTenant: { tenantType: "Family", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 15000,
        securityDeposit: 30000,
        maintenanceCharge: 2000,
      },
      agreement: {
        required: true,
        minimumStay: "6 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        ],
        video: null,
      },
      owner: { userId: "001", name: "Rudra Prakash Mallick" },
      verified: false,
    },

    {
      _id: "2",
      title: "Modern Studio Apartment",
      description: "Perfect for working professionals",
      propertyType: "Studio",
      roomType: "Single",
      location: { area: "Pune", lat: 18.5204, lng: 73.8567 },
      preferredTenant: { tenantType: "Bachelor", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 12000,
        securityDeposit: 24000,
        maintenanceCharge: 1500,
      },
      agreement: {
        required: true,
        minimumStay: "3 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        ],
        video: null,
      },
      owner: { userId: "002", name: "Rudra Prakash Mallick" },
      verified: true,
    },

    {
      _id: "3",
      title: "Luxury 2BHK Flat",
      description: "Fully furnished with parking",
      propertyType: "Apartment",
      roomType: "Double",
      location: { area: "Mumbai", lat: 19.076, lng: 72.8777 },
      preferredTenant: { tenantType: "Family", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 25000,
        securityDeposit: 50000,
        maintenanceCharge: 3000,
      },
      agreement: {
        required: true,
        minimumStay: "12 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        ],
        video: null,
      },
      owner: { userId: "003", name: "Rudra Prakash Mallick" },
      verified: true,
    },

    {
      _id: "4",
      title: "Affordable PG Room",
      description: "Best for students",
      propertyType: "PG",
      roomType: "Single",
      location: { area: "Bangalore", lat: 12.9716, lng: 77.5946 },
      preferredTenant: { tenantType: "Bachelor", genderPreference: "Male" },
      amenities: [],
      rentDetails: {
        monthlyRent: 7000,
        securityDeposit: 14000,
        maintenanceCharge: 1000,
      },
      agreement: { required: false, minimumStay: "", additionalTerms: "" },
      media: {
        images: [
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
        ],
        video: null,
      },
      owner: { userId: "004", name: "Rudra Prakash Mallick" },
      verified: false,
    },

    {
      _id: "5",
      title: "Shared Flat for Girls",
      description: "Safe and secure environment",
      propertyType: "Apartment",
      roomType: "Shared",
      location: { area: "Delhi", lat: 28.7041, lng: 77.1025 },
      preferredTenant: { tenantType: "Bachelor", genderPreference: "Female" },
      amenities: [],
      rentDetails: {
        monthlyRent: 6000,
        securityDeposit: 12000,
        maintenanceCharge: 800,
      },
      agreement: {
        required: true,
        minimumStay: "6 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
        ],
        video: null,
      },
      owner: { userId: "005", name: "Rudra Prakash Mallick" },
      verified: true,
    },

    {
      _id: "6",
      title: "Compact 1RK Room",
      description: "Budget-friendly option",
      propertyType: "Apartment",
      roomType: "Single",
      location: { area: "Kolkata", lat: 22.5726, lng: 88.3639 },
      preferredTenant: { tenantType: "Any", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 4000,
        securityDeposit: 8000,
        maintenanceCharge: 500,
      },
      agreement: { required: false, minimumStay: "", additionalTerms: "" },
      media: {
        images: [
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
        ],
        video: null,
      },
      owner: { userId: "006", name: "Rudra Prakash Mallick" },
      verified: false,
    },

    {
      _id: "7",
      title: "Furnished 1BHK",
      description: "Ready to move in",
      propertyType: "Apartment",
      roomType: "Single",
      location: { area: "Hyderabad", lat: 17.385, lng: 78.4867 },
      preferredTenant: { tenantType: "Family", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 9000,
        securityDeposit: 18000,
        maintenanceCharge: 1200,
      },
      agreement: {
        required: true,
        minimumStay: "6 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
        ],
        video: null,
      },
      owner: { userId: "007", name: "Rudra Prakash Mallick" },
      verified: true,
    },

    {
      _id: "8",
      title: "Co-living Space",
      description: "Modern shared living",
      propertyType: "PG",
      roomType: "Shared",
      location: { area: "Chennai", lat: 13.0827, lng: 80.2707 },
      preferredTenant: { tenantType: "Bachelor", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 6500,
        securityDeposit: 13000,
        maintenanceCharge: 1000,
      },
      agreement: {
        required: true,
        minimumStay: "3 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800",
        ],
        video: null,
      },
      owner: { userId: "008", name: "Rudra Prakash Mallick" },
      verified: false,
    },

    {
      _id: "9",
      title: "Premium Flat near IT Hub",
      description: "Ideal for IT professionals",
      propertyType: "Apartment",
      roomType: "Double",
      location: { area: "Noida", lat: 28.5355, lng: 77.391 },
      preferredTenant: { tenantType: "Family", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 18000,
        securityDeposit: 36000,
        maintenanceCharge: 2000,
      },
      agreement: {
        required: true,
        minimumStay: "12 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
        ],
        video: null,
      },
      owner: { userId: "009", name: "Rudra Prakash Mallick" },
      verified: true,
    },

    {
      _id: "10",
      title: "Hostel Style Room",
      description: "Best for students",
      propertyType: "Hostel",
      roomType: "Shared",
      location: { area: "Jaipur", lat: 26.9124, lng: 75.7873 },
      preferredTenant: { tenantType: "Student", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 3000,
        securityDeposit: 6000,
        maintenanceCharge: 500,
      },
      agreement: { required: false, minimumStay: "", additionalTerms: "" },
      media: {
        images: [
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
        ],
        video: null,
      },
      owner: { userId: "0010", name: "Rudr Prakash Mallicka" },
      verified: false,
    },

    {
      _id: "11",
      title: "2BHK Shared Apartment",
      description: "Spacious and affordable",
      propertyType: "Apartment",
      roomType: "Shared",
      location: { area: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
      preferredTenant: { tenantType: "Bachelor", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 8500,
        securityDeposit: 17000,
        maintenanceCharge: 1200,
      },
      agreement: {
        required: true,
        minimumStay: "6 months",
        additionalTerms: "",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
        ],
        video: null,
      },
      owner: { userId: "0011", name: "Rudr Prakash Mallicka" },
      verified: true,
    },

    {
      _id: "12",
      title: "Compact Studio Room",
      description: "Minimal and efficient",
      propertyType: "Studio",
      roomType: "Single",
      location: { area: "Indore", lat: 22.7196, lng: 75.8577 },
      preferredTenant: { tenantType: "Any", genderPreference: "Any" },
      amenities: [],
      rentDetails: {
        monthlyRent: 5500,
        securityDeposit: 11000,
        maintenanceCharge: 700,
      },
      agreement: { required: false, minimumStay: "", additionalTerms: "" },
      media: {
        images: [
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
        ],
        video: null,
      },
      owner: { userId: "0012", name: "Rudr Prakash Mallicka" },
      verified: false,
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
