import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../services/authService";
import "./Login.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await register(username, email, password);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      const firstError =
        data && typeof data === "object"
          ? Object.values(data).flat()[0]
          : null;
      toast.error(firstError || "Registration failed. Please try again.");
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

        <h1>Create your account</h1>
        <p className="auth-subtitle">A calm, colorful place for your thoughts.</p>

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
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={8}
            />
          </label>

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Sign up"}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

      </div>

    </div>
  );
}
