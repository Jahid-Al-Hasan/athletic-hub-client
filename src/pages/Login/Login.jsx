import React, { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../provider/AuthContext";

const Login = () => {
  const userInfo = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      console.log(userInfo);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-base-100 rounded-xl border-primary border-2 shadow-md shadow-primary">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn btn-outline w-full mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-6 h-6"
        >
          <path
            fill="#fbc02d"
            d="M43.6 20.5h-1.9v-.1H24v7.1h11.3C33.6 32.6 29.3 35 24 35c-6.1 0-11.3-5-11.3-11s5.2-11 11.3-11c2.9 0 5.4 1 7.4 2.6l5.3-5.2C32.9 7.3 28.7 6 24 6 12.9 6 4 14.7 4 25s8.9 19 20 19c11.5 0 19.6-8.1 19.6-19 0-1.2-.1-2.1-.3-3.5z"
          />
          <path
            fill="#e53935"
            d="M6.3 14.9l5.9 4.3C14 16.1 18.6 13 24 13c2.9 0 5.4 1 7.4 2.6l5.3-5.2C32.9 7.3 28.7 6 24 6c-7.5 0-14 3.5-17.7 8.9z"
          />
          <path
            fill="#4caf50"
            d="M24 44c4.9 0 9.3-1.6 12.7-4.3l-5.9-4.8C28.5 36.1 26.3 37 24 37c-5.3 0-9.6-3.5-11.2-8.2l-6 4.7C10 40.3 16.5 44 24 44z"
          />
          <path
            fill="#1565c0"
            d="M43.6 20.5H24v7.1h11.3c-1.2 3.3-4 5.9-7.3 6.6l.1.1 5.9 4.8c-.4.3 7.6-5.6 7.6-15.1 0-1.2-.1-2.1-.3-3.5z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="divider">OR</div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Mail className="w-4 h-4 opacity-70" />
            <input
              type="email"
              className="grow"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Lock className="w-4 h-4 opacity-70" />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </label>
          <label className="label">
            <a
              href="/forgot-password"
              className="label-text-alt link link-hover"
            >
              Forgot password?
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="link link-primary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
