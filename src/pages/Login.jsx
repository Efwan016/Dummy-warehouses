import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ambil hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // ambil login dari context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulasi delay request
    setTimeout(() => {
      const result = login(email, password); // panggil login context
      setLoading(false);

      if (result.success) {
        navigate("/overview"); // redirect setelah login sukses
      } else {
        setError(result.message || "Email atau password salah!");
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    alert("Google Login clicked!");
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <main className="flex flex-1 h-screen items-center">
      <div className="flex flex-col h-screen overflow-hidden rounded-tr-[32px] pl-[30px] pt-[46px] w-[685px] shrink-0 blue-gradient shadow-2xl border-2 border-gray-200">
        {/* Kiri layout */}
        <p className="font-semibold text-lg text-monday-lime-green-char">
          — Manage Stock and Merchants
        </p>
        <p className="font-extrabold text-[42px] uppercase text-gray-800 mt-4 mb-[30px]">
          Optimized Inventory,
          <br />
          Effortless Workflow 🎯
        </p>
        <div className="flex flex-1 overflow-hidden rounded-tl-[20px]">
          <img
            src="/assets/images/backgrounds/bg-image-1.png"
            className="size-full object-cover object-left-top"
            alt="Warehouse background"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-[435px] shrink-0 rounded-3xl gap-8 p-6 bg-white shadow shadow-2x1 border-2 border-gray-200"
        >
          <img
            src="/assets/images/logos/logo.svg"
            className="w-[203px] mx-auto"
            alt="logo"
          />
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-3 text-center">
              <p className="font-semibold text-2xl">Hey🙌🏻, Welcome Back!</p>
              <p className="font-medium text-monday-gray">
                Login to your account to continue!
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] border rounded px-3"
                placeholder="Your email address"
              />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] border rounded px-3"
                placeholder="Your password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full font-bold bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>

            <div className="flex items-center gap-2">
              <hr className="flex-grow border-gray-600" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 border-2 border-gray-400 w-full py-2 rounded hover:bg-gray-400"
            >
              <img
                src="/assets/images/icons/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Sign in with Google</span>
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-center"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
