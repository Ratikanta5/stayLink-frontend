import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LocationProvider } from "./contexts/locationContext/LocationContext";
import { RoomProvider } from "./contexts/roomContext/RoomContext";
import { TestimonialProvider } from "./contexts/testimonialContext/TestimonialContext";

createRoot(document.getElementById("root")).render(
  <LocationProvider>
    <RoomProvider>
      <TestimonialProvider>
        <App />
      </TestimonialProvider>
    </RoomProvider>
  </LocationProvider>,
);
