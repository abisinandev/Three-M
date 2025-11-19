import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@shared/components/auth/ButtonField";
import { InputField } from "@shared/components/auth/InputFields";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@stores/user/UserAuthStore";


const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const forgotPasswordMutation = useForgotPassword();
  const setData = useAuthStore(s => s.setData);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: (res) => {
          toast.success(`${res.data.message} 🎉`);
          setData(email, Date.now(), res.data.token);
          navigate({
            to: "/auth/forgot-password/verify-otp",
            replace: true,
          })
          setIsLoading(false);

        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Forgot password failed");
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        text={isLoading ? "Sending..." : "Send Reset OTP"}
        loading={isLoading}
        type="submit"
      />

      <p className="text-center text-xs text-cool-white/50 mt-6">
        Remember your password?{" "}
        <button
          type="button"
          className="text-teal-green font-medium hover:underline"
        >
          Login here
        </button>
      </p>

    </form>
  );
};

export default ForgotPasswordForm;
