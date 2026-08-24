import { useState, useEffect } from "react";

export const useSeatsLeft = () => {
  const [seatsLeft, setSeatsLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_BASE_URL ||
          "https://campaign.svastha.fit/api";
        const response = await fetch(`${apiUrl}/seats-left`);
        const data = await response.json();
        if (data.success) {
          setSeatsLeft(data.seats_left);
        }
      } catch (error) {
        console.error("Failed to fetch seats:", error);
        setSeatsLeft(54);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
    const interval = setInterval(fetchSeats, 30000);
    return () => clearInterval(interval);
  }, []);

  const displaySeats = loading
    ? "..."
    : seatsLeft !== null
      ? seatsLeft.toLocaleString()
      : "54";
  const displaySeatsPlus = `${displaySeats}`;

  return { seatsLeft, loading, displaySeats, displaySeatsPlus };
};
