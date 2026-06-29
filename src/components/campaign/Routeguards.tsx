import { useCountry } from "@/contexts/CountryContext";
import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";


const LoadingScreen = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5",
        }}
    >
        <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>Loading...</p>
        </div>
    </div>
);

interface RouteGuardProps {
    children: ReactNode;
}

// India route guard - only India users can access /Ultimate-21-day-weight-loss-challenge
export const IndiaRouteGuard = ({ children }: RouteGuardProps) => {
    const { country, loading } = useCountry();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (country === "IN") {
            return;
        } else if (country === "AE") {
            navigate("/global-21-day-weight-loss-challenge", { replace: true });
        } else {
            navigate("/international-21-day-weight-loss-challenge", { replace: true });
        }
    }, [country, loading, navigate]);

    if (loading) return <LoadingScreen />;
    if (country !== "IN") return <LoadingScreen />;

    return children;
};

// UAE route guard - only UAE users can access /global-21-day-weight-loss-challenge
export const UAERouteGuard = ({ children }: RouteGuardProps) => {
    const { country, loading } = useCountry();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (country === "AE") {
            return;
        } else if (country === "IN") {
            navigate("/Ultimate-21-day-weight-loss-challenge", { replace: true });
        } else {
            navigate("/international-21-day-weight-loss-challenge", { replace: true });
        }
    }, [country, loading, navigate]);

    if (loading) return <LoadingScreen />;
    if (country !== "AE") return <LoadingScreen />;

    return children;
};

// International route guard - only non-IN, non-AE users can access
export const InternationalRouteGuard = ({ children }: RouteGuardProps) => {
    const { country, loading } = useCountry();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (country === "IN") {
            navigate("/Ultimate-21-day-weight-loss-challenge", { replace: true });
        } else if (country === "AE") {
            navigate("/global-21-day-weight-loss-challenge", { replace: true });
        }
    }, [country, loading, navigate]);

    if (loading) return <LoadingScreen />;
    if (country === "IN" || country === "AE") return <LoadingScreen />;

    return children;
};