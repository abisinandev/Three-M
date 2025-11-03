import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

interface UseOTPOptions {
    email: string;
    verifyUrl: string;
    resendUrl: string;
    onSuccessRedirect?: string;
}

export const useOTP = ({
    email,
    verifyUrl,
    resendUrl,
    onSuccessRedirect,
}: UseOTPOptions) => {
    const navigate = useNavigate();

    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [resendCount, setResendCount] = useState(0);
    const [isVerifying, setIsVerifying] = useState(false);
    const MAX_RESEND = 3;
    const storageKey = `otpData_${email}`;

    useEffect(() => {
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            const { expiresAt, resendCount } = JSON.parse(storedData);
            const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
            setTimeLeft(remaining);
            setResendCount(resendCount);
            setCanResend(remaining === 0);
        }
    }, [storageKey]);


    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);


    // ========== Verify OTP ==========
    const verifyOtpMutation = useMutation({
        mutationFn: async (otp: string) => {
            setIsVerifying(true);
            const response = await axios.post(verifyUrl, { email, otp });
            return response;
        },
        onSuccess: (res) => {
            console.log(res,'response body otp')
            toast.success(`${res.data.message} 🎉`);
            localStorage.removeItem(storageKey);
            if (onSuccessRedirect) {
                setTimeout(() => navigate({ to: onSuccessRedirect }), 1000);
            }
        },
        onError: (err: any) => {
            toast.error(err?.data?.message || "Invalid or expired OTP.");
            setIsVerifying(false);
        },
    });

    // ========== Resend OTP ==========
    const resendOtpMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(resendUrl, { email });
            return response;
        },
        onSuccess: (res) => {
            toast.success(res.data.message);
            const expiresAt = Date.now() + 60 * 1000;
            const newResendCount = resendCount + 1;

            localStorage.setItem(storageKey, JSON.stringify({ expiresAt, resendCount: newResendCount }));

            setTimeLeft(60);
            setCanResend(false);
            setOtpValues(Array(6).fill(""));
            setResendCount(newResendCount);
        },
        onError: () => {
            toast.error("Failed to resend OTP. Please try again later.");
            setCanResend(true);
        },
    });

    // ========== Helpers ==========
    const handleVerify = () => {
        const otp = otpValues.join("");
        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }
        verifyOtpMutation.mutate(otp);
    };

    const handleResend = () => {
        if (resendCount >= 3) {
            toast.warning("You’ve reached the resend limit. Try later.");
            return;
        }
        resendOtpMutation.mutate();
    };

    return {
        otpValues,
        setOtpValues,
        verifyOtpMutation,
        resendOtpMutation,
        timeLeft,
        setTimeLeft,
        canResend,
        setCanResend,
        resendCount,
        handleVerify,
        handleResend,
        isVerifying,
        MAX_RESEND
    };
};
