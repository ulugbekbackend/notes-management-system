import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login() {
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await loginUser(username, password);
      navigate("/dashboard");
    } catch {
      toast.error("Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card">

        <div className="auth-brand">
          <span className="auth-mark">N</span>
          <span>Notes</span>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to pick up where you left off.</p>

        <form onSubmit={handleSubmit}>

          <label className="field">
            <span>Username</span>
            <input
              type="text"
              placeholder="yourname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>

      </div>

    </div>
  );
}
