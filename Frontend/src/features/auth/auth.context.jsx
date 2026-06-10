import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ---------------- AUTO SESSION CHECK ---------------- */
    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await getMe();

                if (res?.success && res?.user) {
                    setUser(res.user);
                } else {
                    setUser(null);
                }

            } catch (err) {
                console.log("Auth init error:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};