// useRoomCoordinates.js
import { useState, useEffect } from "react";

// Global variable to store the coordinates
let loadedRoomCoordinates = null;

const useRoomCoordinates = () => {
  const [roomCoordinates, setRoomCoordinates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If coordinates are already loaded, use the cached version
    if (loadedRoomCoordinates) {
      setRoomCoordinates(loadedRoomCoordinates);
      setLoading(false);
    } else {
      console.log("Fetching room coordinates...");
      fetch("/Unity_coords.json")
        .then((response) => response.json())
        .then((data) => {
          console.log("Room coordinates loaded:", data);
          loadedRoomCoordinates = data; // Cache the coordinates globally
          setRoomCoordinates(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading coordinates:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  return { roomCoordinates, loading, error };
};

export default useRoomCoordinates;
