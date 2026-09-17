import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ||
    "https://swcubveqtvjhqwawgcks.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3Y3VidmVxdHZqaHF3YXdnY2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzE4MDYsImV4cCI6MjA2NTY0NzgwNn0.KHkPNj7-685p_-LK-L_8JfO2mzvDrIDfgeiUlvOFBmo",
);

const TOTAL_REGISTRATIONS = 200;

export const useSeatsLeft = () => {
  const [seatsLeft, setSeatsLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const { count, error } = await supabase
          .from("paid_users")
          .select("*", { count: "exact", head: true });

        if (error) throw error;

        const paidCount = count || 0;
        const seats = Math.max(0, TOTAL_REGISTRATIONS - paidCount);
        setSeatsLeft(seats);
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
