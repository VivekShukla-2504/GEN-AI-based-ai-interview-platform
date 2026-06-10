import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();

    const { loading, handleRegister, error } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await handleRegister({
                username: username.trim(),
                email: email.trim(),
                password: password.trim()
            });

            if (result?.success) {
                navigate("/");
            }

        } catch (err) {
            console.log("Register Page Error:", err);
        }
    };

    const isDisabled =
        !username.trim() ||
        !email.trim() ||
        !password.trim() ||
        loading;

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                {/* SINGLE ERROR BOX */}
                {error && (
                    <div style={styles.errorBox}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            minLength={6}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        className="button primary-button"
                        disabled={isDisabled}
                    >
                        {loading
                            ? "Creating account..."
                            : "Register"}
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </main>
    );
};

const styles = {
    errorBox: {
        background: "#ffe5e5",
        color: "#d60000",
        padding: "10px",
        borderRadius: "6px",
        marginBottom: "10px",
        fontSize: "14px"
    }
};

export default Register;