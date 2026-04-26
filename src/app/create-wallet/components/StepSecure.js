import { Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { getPasswordStrength, STRENGTH_COLORS } from "../constants";

export default function StepSecure({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordError,
  setPasswordError,
  showPass,
  setShowPass,
  showConfirm,
  setShowConfirm,
  isCreating,
  handlePasswordSubmit,
}) {
  const { level, hint } = getPasswordStrength(password);

  return (
    <div className="flex flex-col flex-1 space-y-5">
      <div className="text-center">
        <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-violet-500/30">
          <Lock className="w-8 h-8 text-violet-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Secure Your Wallet</h2>
        <p className="text-slate-400 text-sm">Create a strong password to protect access to your wallet.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            label="New Password"
            type={showPass ? "text" : "password"}
            placeholder="Min. 8 characters"
            icon={Lock}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-[38px] text-slate-400 hover:text-white transition-colors"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {password.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    step <= level ? STRENGTH_COLORS[level - 1] : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">{hint}</p>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError("");
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-[38px] text-slate-400 hover:text-white transition-colors"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {passwordError && (
        <p className="text-xs text-red-400 ml-1 animate-in fade-in">{passwordError}</p>
      )}

      <div className="flex-1" />

      <Button
        fullWidth
        size="lg"
        onClick={handlePasswordSubmit}
        isLoading={isCreating}
        icon={isCreating ? undefined : Sparkles}
      >
        {isCreating ? "Creating Your Wallet…" : "Create Wallet"}
      </Button>
    </div>
  );
}
