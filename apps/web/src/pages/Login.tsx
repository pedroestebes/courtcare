import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const DEMO_EMAIL = "pedro@courtcare.com";
const DEMO_PASSWORD = "demo123";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo mode — bypass API for investor demo
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setAuth(
        { id: "demo-user-001", name: "Pedro Esteves", email: DEMO_EMAIL },
        "demo-token-investor-preview"
      );
      navigate("/dashboard");
      return;
    }

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/25">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-brand-text">
              CourtCare
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-white/50 mt-1">
            Log in to check your body status and train safely
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          {/* Demo credentials helper */}
          <div className="mt-5 pt-5 border-t border-white/10">
            <button
              onClick={fillDemoCredentials}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm shrink-0 group-hover:scale-110 transition-transform">
                🎯
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-brand-300">
                  Use demo account
                </p>
                <p className="text-xs text-brand-400/60">
                  {DEMO_EMAIL} / {DEMO_PASSWORD}
                </p>
              </div>
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-white/50">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-brand-400 font-medium hover:text-brand-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
