import { toast } from 'sonner'
import { useState } from "react";
import z from "zod";
import { RightSidePanel } from "@shared/common/auth/RightSidePanel";
import type { SignupType } from "@shared/types/user/SignupTypes";
import { ValidationSchema } from "@utils/validation/zodFormValidation";
import { InputField } from "@shared/common/auth/InputFields";
import { Button } from "@shared/common/auth/ButtonField";
import { useSignup } from "../hooks/UseSignup";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from '@stores/user/useAuthStore';

export const Signup: React.FC = () => {

  const navigate = useNavigate();
  const signupMutation = useSignup();
  const setPendingEmail = useAuthStore.getState().setPendingEmail; 
  
  const [formData, setFormData] = useState<SignupType>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<Record<keyof SignupType, string>>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    try {
      const singleFieldSchema = ValidationSchema.pick({ [name]: true });
      singleFieldSchema.parse({ [name]: value });

      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err: any) {
      if (err instanceof z.ZodError) {

        const fieldError = err.issues[0]?.message || "";
        setFormErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    }
  };


  const handleSignup = () => {
    const result = ValidationSchema.safeParse(formData);

    if (!result.success) {

      const errors: typeof formErrors = {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      };

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors;
        if (field) errors[field] = issue.message;
      });
      setFormErrors(errors);
      return;
    }


    setFormErrors({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    signupMutation.mutate(result.data, {
      onSuccess: (res) => {
        setPendingEmail(formData.email); 
        navigate({ to: "/auth/verify-otp" });
        toast.success(res.data.message);
      },
      onError: (err: any) => toast.error(err.response?.data?.message || "Verification failed"),
    });
  };

  return (
    <div className="bg-deep-charcoal min-h-screen flex items-center justify-center px-4 text-text-primary">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        <div className="w-full max-w-sm mx-auto">
          <h1 className="text-white text-center text-3xl lg:text-4xl font-bold mb-8 tracking-wide">
            SIGN UP
          </h1>
          <div className="space-y-4">
            <InputField
              label="Full name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChanges}
              error={formErrors.fullName}
            />
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
              label="Phone number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChanges}
              error={formErrors.phone}
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
            <InputField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChanges}
              error={formErrors.confirmPassword}
            />

            <div className="text-xs text-center">
              <span className="text-white">Already have an account? </span>
              <a href="/auth/login" className="text-teal-green hover:underline font-medium">Login</a>
            </div>

            <Button
              text="Sign up"
              onClick={handleSignup}
              loading={signupMutation.isPending}
              disabled={false}
            />

            {/* Google Sign In */}
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
              Sign in with Google
            </button>
          </div>
        </div>

        {/* LogoRightSide */}
        <RightSidePanel />
      </div>
    </div>
  );
};
