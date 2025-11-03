import React, { useRef } from "react";
import { Loader2 } from "lucide-react";
import { RESEND_OTP, VERIFY_OTP } from "../../../shared/contants";
import { useOTP } from "@shared/hooks/useOTP";
import { useAuthStore } from "@stores/user/useAuthStore";

const OTPVerificationPage: React.FC = () => {
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const email = useAuthStore((state) => state.pendingEmail) || "";

    const {
        otpValues,
        setOtpValues,
        handleVerify,
        handleResend,
        canResend,
        timeLeft,
        resendCount,
        isVerifying,
        MAX_RESEND,
        verifyOtpMutation
    } = useOTP({
        email,
        verifyUrl: VERIFY_OTP,
        resendUrl: RESEND_OTP,
        onSuccessRedirect: "/auth/login",
    });


    // ===================== Input Handling =====================
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otpValues];
        newOtp[index] = value;
        setOtpValues(newOtp);

        if (value && index < 5) inputsRef.current[index + 1]?.focus();
        if (!value && index > 0) inputsRef.current[index - 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = Array(6).fill("");
        for (let i = 0; i < paste.length; i++) newOtp[i] = paste[i];
        setOtpValues(newOtp);
        inputsRef.current[Math.min(paste.length, 5)]?.focus();
    };


    const setInputRef = (el: HTMLInputElement | null, index: number) => {
        if (el) inputsRef.current[index] = el;
    };

    return (
        <div className="min-h-screen bg-deep-charcoal flex items-center justify-center px-4">
            <div className="bg-neutral-800 max-w-sm w-full p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-white text-center mb-4">Verify OTP</h1>
                <p className="text-gray-400 text-center text-sm mb-8">
                    We sent a 6-digit code to your email <br />
                    <span className="text-white font-semibold">{email}</span>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={otpValues[index]}
                            ref={(el) => setInputRef(el, index)}
                            onChange={(e) => handleChange(e, index)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-xl font-bold text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                        />
                    ))}
                </div>

                {/* Resend Section */}
                <div className="flex justify-between text-sm mb-4">
                    {resendCount >= MAX_RESEND ? (
                        <span className="text-red-500">Max resend attempts reached ({MAX_RESEND})</span>
                    ) : (
                        <>
                            <span className="text-gray-400">
                                {canResend ? "Didn’t receive the code?" : `Resend in ${timeLeft}s`}
                            </span>
                            <button
                                type="button"
                                disabled={!canResend}
                                onClick={handleResend}
                                className={`font-medium transition ${canResend
                                    ? "text-teal-400 hover:text-teal-300"
                                    : "text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Resend OTP
                            </button>
                        </>
                    )}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={
                        isVerifying ||
                        verifyOtpMutation.isPending ||
                        timeLeft <= 0 ||
                        otpValues.join("").length !== 6
                    }
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform duration-200 shadow-md
                        ${timeLeft <= 0
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-teal-green hover:bg-green-600"
                        }
                        text-white disabled:opacity-60 hover:scale-[1.02]`}
                >
                    {isVerifying || verifyOtpMutation.isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
                        </>
                    ) : timeLeft <= 0 ? (
                        "OTP Expired"
                    ) : (
                        "Verify"
                    )}
                </button>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
