import { useState } from "react";
import { Button } from "@shared/common/auth/ButtonField";
import { QrCode, X } from "lucide-react";

type TwoFAModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  loading?: boolean;
  qrCodeUrl?: string;
};

export const TwoFAModal = ({
  isOpen,
  onClose,
  onVerify,
  loading,
  qrCodeUrl,
}: TwoFAModalProps) => {
  const [code, setCode] = useState("");
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-deep-charcoal w-full max-w-sm rounded-2xl p-6 text-white shadow-2xl border border-white/10 transition-all duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Two-Factor Authentication
        </h2>
        <p className="text-gray-400 text-sm text-center mb-5">
          Enter your 6-digit authentication code
        </p>

        {/* QR Code Toggle */}
        {qrCodeUrl && (
          <div className="mb-4 text-center">
            <button
              onClick={() => setShowQr((prev) => !prev)}
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
            >
              <QrCode size={16} />
              {showQr ? "Hide QR Code" : "Need to scan the QR Code?"}
            </button>
          </div>
        )}

        {/* QR Code Section */}
        {showQr && qrCodeUrl && (
          <div className="mb-4 flex flex-col items-center gap-2 animate-fadeIn">
            <img
              src={qrCodeUrl}
              alt="2FA QR Code"
              className="w-40 h-40 rounded-md border border-white/10 shadow-md"
            />
            <p className="text-xs text-gray-400">
              Scan this with your authenticator app
            </p>
          </div>
        )}

        <div className="relative mt-4">
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-3 rounded-lg bg-white/5 border border-white/10
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
               outline-none transition-all duration-200 text-white placeholder-transparent"
          />
          <label
            htmlFor="code"
            className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200
               peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500
               peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-[12px] peer-focus:text-blue-400"
          >
            Authentication Code
          </label>
        </div>


        {/* Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          <Button
            text="Cancel"
            onClick={onClose}
          />
          <Button
            text="Verify"
            onClick={() => onVerify(code)}
            loading={loading}
            disabled={!code}
          />
        </div>
      </div>
    </div>
  );
};
