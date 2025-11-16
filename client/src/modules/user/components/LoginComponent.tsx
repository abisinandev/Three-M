import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@shared/common/auth/ButtonField";
import { InputField } from "@shared/common/auth/InputFields";
import { RightSidePanel } from "@shared/common/auth/RightSidePanel";
import { LoginValidationSchema } from "@utils/validation/zodFormValidation";
import type { LoginType } from "@shared/types/user/LoginTypes";
import { useLogin } from "../hooks/useLogin";
import { useVerify2FA } from "@shared/services/user/useVerify2FA";
import { TwoFAModal } from "@shared/common/modals/TwoFaModal";


const LoginComponent = () => {
    const navigate = useNavigate();
    const loginMutation = useLogin();
    const verify2faMutation = useVerify2FA();

    const [formData, setFormData] = useState<LoginType>({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState<Record<keyof LoginType, string>>({
        email: "",
        password: "",
    });

    const [is2faModalOpen, setIs2faModalOpen] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        try {
            const singleFieldSchema = LoginValidationSchema.pick({ [name]: true });
            singleFieldSchema.parse({ [name]: value });
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                const fieldError = err.issues[0]?.message || "";
                setFormErrors((prev) => ({ ...prev, [name]: fieldError }));
            }
        }
    };

    const handleLogin = () => {
        const result = LoginValidationSchema.safeParse(formData);
        if (!result.success) {
            const errors: typeof formErrors = { email: "", password: "" };
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof typeof errors;
                if (field) errors[field] = issue.message;
            });
            setFormErrors(errors);
            return;
        }

        loginMutation.mutate(result.data, {
            onSuccess: (res) => {
                setQrCodeUrl(res.data.qrCode);
                setIs2faModalOpen(true);
                toast.info("Scan QR Code and verify your 2FA");
            },
            onError: (err: any) => {
                toast.error(err.response?.data?.message || "Login failed");
            },
        });
    };

    const handleVerify2FA = (code: string) => {
        verify2faMutation.mutate(
            { email: formData.email, code },
            {
                onSuccess: (res) => {
                    toast.success(res.data?.message || "2FA verified successfully!");
                    setIs2faModalOpen(false);
                    navigate({ to: "/profile", replace: true });
                },
                onError: (err) => {
                    console.log('Handle verify Error: ', err.message)
                    toast.error("Invalid 2FA code")
                }
            }
        );
    };

    return (
        <div className="bg-deep-charcoal min-h-screen flex items-center justify-center px-4 text-text-primary">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Section */}
                <div className="w-full max-w-sm mx-auto border border-neutral-800 rounded-2xl p-6">
                    <h1 className="text-white text-center text-3xl lg:text-4xl font-extrabold mb-8 tracking-wide">
                        Welcome Back
                    </h1>

                    <div className="space-y-5">
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChanges}
                            error={formErrors.email}
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChanges}
                            error={formErrors.password}
                        />

                        <div className="flex justify-between items-center text-[12px]">
                            <a
                                onClick={() => navigate({ to: "/" })}
                                className="text-teal-green hover:underline cursor-pointer"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            text="Login"
                            onClick={handleLogin}
                            loading={loginMutation.isPending}
                        />

                        <div className="flex items-center gap-2 my-3">
                            <hr className="flex-1 border-neutral-700" />
                            <span className="text-gray-400 text-[10px]">OR</span>
                            <hr className="flex-1 border-neutral-700" />
                        </div>

                        <button
                            type="button"
                            className="w-full border border-border-gray-dark hover:border-text-secondary text-white hover:text-deep-charcoal font-semibold text-sm py-2.5 rounded flex items-center justify-center gap-2 transition-all duration-200 hover:bg-cool-white"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>

                        <p className="text-center text-[12px] text-neutral-500">
                            Don’t have an account?{" "}
                            <a
                                onClick={() => navigate({ to: "/auth/signup" })}
                                className="text-teal-green font-medium hover:underline cursor-pointer"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side Panel (Illustration / Branding) */}
                <RightSidePanel />
            </div>

            {/* Two-Factor Authentication Modal */}
            <TwoFAModal
                isOpen={is2faModalOpen}
                onClose={() => setIs2faModalOpen(false)}
                onVerify={handleVerify2FA}
                loading={verify2faMutation.isPending}
                qrCodeUrl={qrCodeUrl || ""}
            />
        </div>
    );
};

export default LoginComponent;
