import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { loginUser } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

const DEFAULT_USERNAME = "emilys";
const DEFAULT_PASSWORD = "emilyspass";

const LoginPage = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const userData = await loginUser(username, password);
      login(userData);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl border border-neutral p-8">
        <h1 className="text-2xl font-bold text-secondary text-center mb-2">Login</h1>
        <p className="text-secondary/60 text-sm text-center mb-6">Sign in with your credentials</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-secondary text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2.5 rounded-lg border border-neutral text-secondary placeholder-secondary/40 bg-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-secondary text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 rounded-lg border border-neutral text-secondary placeholder-secondary/40 bg-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-accent font-semibold py-2.5 rounded-lg hover:bg-secondary/80 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-secondary/50 text-xs text-center mt-6">
          Demo: emilys / emilyspass
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
