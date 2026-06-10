import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import React from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout, loading } = useAuth();

    const logoutUser = async () => {
        const result = await handleLogout();

        if (result) {
            navigate("/login", { replace: true });
        }
    };

    return (
        <nav style={styles.nav}>
            {/* LEFT */}
            <div style={styles.left}>
                <h2 style={styles.logo}>AI Interview Prep</h2>
            </div>

            {/* RIGHT */}
            <div style={styles.right}>
                {user && (
                    <>
                        <span style={styles.userText}>
                            Hi, {user.username || "User"}
                        </span>

                        <button
                            onClick={logoutUser}
                            className="button primary-button"
                            disabled={loading}
                            style={{
                                opacity: loading ? 0.6 : 1,
                                cursor: loading ? "not-allowed" : "pointer"
                            }}
                        >
                            {loading ? "Logging out..." : "Logout"}
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000
    },

    left: {
        display: "flex",
        alignItems: "center"
    },

    right: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },

    logo: {
        margin: 0,
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer"
    },

    userText: {
        fontSize: "14px",
        color: "#444"
    }
};

export default Navbar;