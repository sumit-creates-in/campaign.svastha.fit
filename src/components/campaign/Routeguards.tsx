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
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                Loading...
            </p>
        </div>
    </div>
);

interface RouteGuardProps {
    children: ReactNode;
}

// India route - only India users
export const IndiaRouteGuard = ({ children }: RouteGuardProps) => {
    const { country, loading } = useCountry();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (country === "IN") {
            return;
        }

        if (country === "AE") {
            navigate("/global-21-day-weight-loss-challenge", {
                replace: true,
            });
        } else {
            navigate("/international-21-day-weight-loss-challenge", {
                replace: true,
            });
        }
    }, [country, loading, navigate]);

    if (loading) return <LoadingScreen />;
    if (country !== "IN") return <LoadingScreen />;

    return children;
};

// UAE route - India + UAE users
export const UAERouteGuard = ({ children }: RouteGuardProps) => {
    const { country, loading } = useCountry();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (country === "AE" || country === "IN") {
            return;
        }

        navigate("/international-21-day-weight-loss-challenge", {
            replace: true,
        });
    }, [country, loading, navigate]);

    if (loading) return <LoadingScreen />;

    // Allow India and UAE
    if (country !== "AE" && country !== "IN") {
        return <LoadingScreen />;
    }

    return children;
};

// International route - India + all non-AE countries
export const InternationalRouteGuard = ({
    children,
}: RouteGuardProps) => {
    const { country, loading } = useCountry();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        // UAE users should always stay on UAE page
        if (country === "AE") {
            navigate("/global-21-day-weight-loss-challenge", {
                replace: true,
            });
        }
    }, [country, loading, navigate]);

    if (loading) return <LoadingScreen />;

    // Only block UAE users
    if (country === "AE") {
        return <LoadingScreen />;
    }

    return children;
};