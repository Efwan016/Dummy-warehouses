import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onBackToLogin }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgot = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        setTimeout(() => {
            setLoading(false);
            setMessage("We’ve sent a password reset link to your email!");
        }, 1000);
    };
    const handleBackToLogin = () => {
        navigate("/login");
    };


    return (
        <main className="flex flex-1 h-screen items-center">
            <div className="flex flex-col h-screen overflow-hidden rounded-tr-[32px] pl-[30px] pt-[46px] w-[685px] shrink-0 blue-gradient">
                <p className="font-semibold text-lg text-monday-lime-green-char">
                  Adzani — Manage Stock and Merchants
                </p>
                <p className="font-extrabold text-[42px] uppercase text-gray-800 mt-4 mb-[30px]">
                    Secure Access,
                    <br />
                    Reset Your Password 🔑
                </p>
                <div className="flex flex-1 overflow-hidden rounded-tl-[20px]">
                    <img
                        src="/assets/images/backgrounds/bg-image-1.png"
                        className="size-full object-cover object-left-top"
                        alt="Forgot Password background"
                    />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center">
                <form
                    onSubmit={handleForgot}
                    className="flex flex-col w-[435px] shrink-0 rounded-3xl gap-10 p-6 bg-white shadow"
                >
                    <img
                        src="/assets/images/logos/logo.svg"
                        className="w-[203px] mx-auto"
                        alt="logo"
                    />
                    <div className="flex flex-col gap-[30px]">
                        <div className="flex flex-col gap-3 text-center">
                            <p className="font-semibold text-2xl">Forgot Password? 🤔</p>
                            <p className="font-medium text-monday-gray">
                                Enter your email and we’ll send you a reset link.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <input
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                value={email}
                                className="w-full h-[50px] border rounded px-3"
                                placeholder="Your email address"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full font-bold bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                        {message && (
                            <p className="text-green-600 text-center">{message}</p>
                        )}
                        <button
                            type="button"
                            onClick={handleBackToLogin}
                            className="text-blue-600 hover:underline text-center"
                        >
                            ← Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ForgotPassword;
