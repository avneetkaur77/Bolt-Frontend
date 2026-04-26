import { ShieldCheck, ArrowRight } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { BACKUP_TIPS } from "../constants";

export default function StepBackup({ onNext }) {
  return (
    <div className="flex flex-col flex-1 space-y-4">
      <div className="text-center mb-2">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-indigo-500/30">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-1">Backup Your Phrase</h2>
        <p className="text-slate-400 text-sm">Before proceeding, confirm you understand the risks.</p>
      </div>

      <div className="space-y-3">
        {BACKUP_TIPS.map((item) => (
          <Card key={item.title} className="p-4 flex items-start gap-3">
            <span className="text-xl shrink-0">{item.icon}</span>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex-1" />
      <Button fullWidth size="lg" onClick={onNext} icon={ArrowRight}>
        I Understand, Continue
      </Button>
    </div>
  );
}
