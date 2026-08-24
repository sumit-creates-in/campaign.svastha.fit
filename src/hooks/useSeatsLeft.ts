import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const TOTAL_REGISTRATIONS = 71;

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
