import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { Loading } from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import PageTitle from "../../utils/PageTitle/PageTitle";

const Login = () => {
  const { user, signInWithGoogle, loginUser, loading } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    navigate(location?.state || "/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Login successfully",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || "/");
      })
      .catch((err) => {
        Swal.fire({
          title: "User name or Password is not correct",
          icon: "error",
          draggable: true,
        });
        console.log(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "login successfully",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || "/");
      })
      .catch((err) => {
        Swal.fire({
          title: "login failed",
          icon: "error",
          draggable: true,
        });
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
      <PageTitle title="Login" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        {/* Email/Password Form */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* email */}
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="your@email.com"
                className="border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* password */}
            <div className="relative">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Lock className="absolute left-3 top-4/6 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

              <button
                type="button"
                className="absolute right-3 top-4/6 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            <Label>
              <Link
                to="/forgot-password"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </Label>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full border border-primary cursor-pointer"
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
            Login with Google
          </Button>
        </CardFooter>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?
            <Link to="/signup">
              <Button
                className="cursor-pointer text-accent-500 font-bold"
                variant="link"
              >
                Sign Up
              </Button>
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
