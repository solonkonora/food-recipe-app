import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Signup({ onSwitchToLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, name);
      // Success - AuthContext will update user state
    } catch (err) {
      setError(err.response?.error || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {onBack && (
          <button onClick={onBack} style={styles.backButton} aria-label="Go back">
            <ArrowLeft size={20} />
            <span style={{ marginLeft: '0.5rem' }}>Back</span>
          </button>
        )}
        <h2 style={styles.title}>Sign Up for LocalBite</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.passwordInput}
                placeholder="Enter your password (min 6 characters)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} style={styles.switchButton}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

Signup.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired,
  onBack: PropTypes.func,
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#E0F2FF",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    color: "#374151",
    cursor: "pointer",
    fontSize: "0.875rem",
    padding: "0.5rem",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    padding: "0.75rem",
    paddingRight: "2.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
  },
  eyeButton: {
    position: "absolute",
    right: "0.75rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    color: "#666",
  },
  button: {
    padding: "0.75rem",
    background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "opacity 0.2s",
  },
  error: {
    padding: "0.75rem",
    backgroundColor: "#fee",
    color: "#c33",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
  switchText: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#666",
    fontSize: "0.9rem",
  },
  switchButton: {
    background: "none",
    border: "none",
    color: "#ea580c",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
    fontSize: "inherit",
    fontWeight: "500",
  },
};

