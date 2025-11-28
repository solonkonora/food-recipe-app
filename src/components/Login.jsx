import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Login({ onSwitchToSignup, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      // Success - AuthContext will update user state
    } catch (err) {
      setError(err.response?.error || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // redirect to backend Google OAuth route
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const handleFacebookSignIn = () => {
    // redirect to backend Facebook OAuth route
    window.location.href = `${API_URL}/api/auth/facebook`;
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
        <h2 style={styles.title}>Login to LocalBite</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

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
                placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine}></span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            style={styles.googleButton}
            disabled={loading}
          >
            <svg style={styles.googleIcon} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleFacebookSignIn}
            style={styles.facebookButton}
            disabled={loading}
          >
            <svg style={styles.facebookIcon} viewBox="0 0 24 24" fill="#ffffff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </form>

        <p style={styles.switchText}>
          Don&apos;t have an account?{" "}
          <button onClick={onSwitchToSignup} style={styles.switchButton}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  onSwitchToSignup: PropTypes.func.isRequired,
  onBack: PropTypes.func,
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f1f5f5ff",
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
    marginTop: "2.5rem",
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
    background: "#1877F2",
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
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#ddd",
  },
  dividerText: {
    padding: "0 1rem",
    color: "#666",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    backgroundColor: "white",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
  },
  facebookButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    backgroundColor: "#1877F2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  facebookIcon: {
    width: "20px",
    height: "20px",
  },
};
