import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return "weak";
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return "strong";
    return "medium";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.agree) newErrors.agree = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Call the signup function from AuthContext
        await signup(form.fullName, form.email, form.password);
        // Redirect to dashboard on successful signup
        navigate("/dashboard");
      } catch (error) {
        console.error("Signup failed:", error);
        setErrors({ email: "Failed to create account. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="John Doe"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john.doe@example.com"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <span className="text-sm">Strength: </span>
                  <span
                    className={`text-sm ${
                      getPasswordStrength(form.password) === "weak"
                        ? "text-red-500"
                        : getPasswordStrength(form.password) === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {getPasswordStrength(form.password)}
                  </span>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="text-left">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link to="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agree && <p className="mt-1 text-sm text-red-500">{errors.agree}</p>}

            <Button type="submit" variant="secondary" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;