import { X, CheckCircle, Send } from 'lucide-react';
import { useState, useEffect, type FormEvent } from 'react';
import { useUserStore } from '@stores/user/UserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileApi, SendEmailOtpApi, VerifyEmailOtpApi } from '@shared/services/user/UpdateProfileApi';
import { toast } from 'sonner';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
    const { user } = useUserStore();
    const queryClient = useQueryClient();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [originalEmail] = useState(user?.email || '');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setFullName(user.fullName || '');
            setPhone(user.phone || '');
            setEmail(user.email || '');
            setIsEmailChanged(false);
            setShowOtpField(false);
            setOtp('');
            setIsEmailVerified(false);
            setErrors({});
        }
    }, [isOpen, user]);

    useEffect(() => {
        const changed = email.trim() !== originalEmail.trim();
        setIsEmailChanged(changed);
        if (!changed) {
            setShowOtpField(false);
            setIsEmailVerified(false);
        }
    }, [email, originalEmail]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!fullName.trim()) newErrors.fullName = 'Name is required';
        else if (fullName.trim().length < 2) newErrors.fullName = 'Name too short';

        if (phone && !/^\d{10}$/.test(phone)) newErrors.phone = 'Invalid phone number';

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';

        if (isEmailChanged && !isEmailVerified) newErrors.email = 'Verify your new email';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendOtpMutation = useMutation({
        mutationFn: () => SendEmailOtpApi({ email: email.trim() }),
        onSuccess: () => setShowOtpField(true),
        onError: () => setErrors(prev => ({ ...prev, email: 'Failed to send OTP' })),
    });

    const verifyOtpMutation = useMutation({
        mutationFn: () => VerifyEmailOtpApi({ email: email.trim(), otp }),
        onSuccess: () => {
            setIsEmailVerified(true);
            setShowOtpField(false);
            setOtp('');
        },
        onError: () => setErrors(prev => ({ ...prev, otp: 'Invalid or expired OTP' })),
    });

    const updateProfileMutation = useMutation({
        mutationFn: () =>
            UpdateProfileApi({
                fullName: fullName.trim(),
                phone: phone || undefined,
                email: isEmailChanged ? email.trim() : undefined,
            }),

        onSuccess: (res) => {
            toast.success(res.message || "Profile updated")
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onClose();
        },

        onError: () => {
            setErrors(prev => ({ ...prev, submit: 'Failed to update profile' }));
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate() || !user) return;
        updateProfileMutation.mutate();
    };

    if (!isOpen) return null;

    const isKycVerified = user?.kycStatus === 'verified';
    const maskedAadhaar = user?.aadhaarNumber
        ? `XXXX-XXXX-${user.aadhaarNumber.slice(-4)}`
        : 'Not added';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] p-6 shadow-2xl max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 bg-[#111111] border border-[#333] rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#22C55E]"
                            placeholder="Enter full name"
                        />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone Number</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-gray-500 bg-[#111111] border border-r-0 border-[#333] rounded-l-lg text-xs">+91</span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                maxLength={10}
                                className="w-full px-3 py-2 bg-[#111111] border border-[#333] rounded-r-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#22C55E]"
                                placeholder="10-digit mobile"
                            />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-[#111111] border border-[#333] rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#22C55E]"
                            placeholder="name@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}

                        {isEmailChanged && !isEmailVerified && !showOtpField && (
                            <button
                                type="button"
                                onClick={() => sendOtpMutation.mutate()}
                                disabled={sendOtpMutation.isPending}
                                className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#22C55E] hover:text-[#1ea853]"
                            >
                                <Send className="w-3.5 h-3.5" />
                                {sendOtpMutation.isPending ? 'Sending...' : 'Verify Email'}
                            </button>
                        )}

                        {showOtpField && (
                            <div className="mt-2 space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        maxLength={6}
                                        placeholder="Enter 6-digit OTP"
                                        className="flex-1 px-3 py-2 bg-[#111111] border border-[#333] rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#22C55E]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => verifyOtpMutation.mutate()}
                                        disabled={verifyOtpMutation.isPending || otp.length !== 6}
                                        className="px-3 py-2 bg-[#22C55E] hover:bg-[#1ea853] disabled:opacity-60 text-white text-xs font-medium rounded-lg transition"
                                    >
                                        {verifyOtpMutation.isPending ? '...' : 'Verify'}
                                    </button>
                                </div>
                                {errors.otp && <p className="text-red-400 text-xs">{errors.otp}</p>}
                                <p className="text-xs text-gray-500">Check spam folder if not received</p>
                            </div>
                        )}

                        {isEmailVerified && (
                            <div className="mt-2 flex items-center gap-1.5 text-green-400 text-xs font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Email verified
                            </div>
                        )}
                    </div>

                    {isKycVerified && (
                        <div className="pt-4 border-t border-[#222] space-y-3">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">PAN</span>
                                <span className="text-white font-medium flex items-center gap-1.5">
                                    {user?.panNumber}
                                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                </span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Aadhaar</span>
                                <span className="text-white font-medium flex items-center gap-1.5">
                                    {maskedAadhaar}
                                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">KYC verified • These details cannot be changed</p>
                        </div>
                    )}

                    {errors.submit && <p className="text-red-400 text-xs">{errors.submit}</p>}

                    <div className="flex gap-3 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-[#1f1f1f] hover:bg-[#252525] text-white text-xs font-medium rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateProfileMutation.isPending || (isEmailChanged && !isEmailVerified)}
                            className="flex-1 px-4 py-2.5 bg-[#22C55E] hover:bg-[#1ea853] disabled:opacity-60 text-white text-xs font-semibold rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {updateProfileMutation.isPending ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;