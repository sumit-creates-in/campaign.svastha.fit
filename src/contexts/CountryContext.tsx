import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CountryContextType {
    country: string | null;
    loading: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
    const [country, setCountry] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const detectCountry = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                if (!response.ok) throw new Error("API failed");

                const data = await response.json();
                const detectedCountry = data.country_code?.toUpperCase();


                setCountry(detectedCountry || "OTHER");
            } catch (error) {
                console.error("❌ Country detection failed:", error);
                setCountry("OTHER");
            } finally {
                setLoading(false);
            }
        };

        detectCountry();
    }, []);

    return (
        <CountryContext.Provider value={{ country, loading }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = (): CountryContextType => {
    const context = useContext(CountryContext);
    if (context === undefined) {
        throw new Error("useCountry must be used within CountryProvider");
    }
    return context;
};