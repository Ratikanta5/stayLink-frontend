import axios from "axios";
import { data } from "react-router-dom";

export const getUserLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  try {
    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    );

    // console.log(data);
    

    const area = data.locality || data.city || "";
    const city = data.city || data.principalSubdivision || "";
    const state = data.principalSubdivision || "";
    const country = data.countryName || "";

    return {
      lat,
      lng,
      area,
      city,
      state,
      country,

      // formatted for UI
      fullAddress: [area, city, state].filter(Boolean).join(", "),
    };
  } catch (error) {
    return {
      lat,
      lng,
      area: "",
      city: "Unknown",
      state: "",
      country: "",
      fullAddress: "Unknown",
    };
  }
};
