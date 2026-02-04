export default function StepProgress({ currentStep }) {
    const steps = [
        { name: 'Connect', id: 1 },
        { name: 'Identity', id: 2 },
        { name: 'Send', id: 3 },
    ];

    return (
        <div className="w-full flex items-center justify-between mb-8 px-2">
            {steps.map((step, index) => {
                const isActive = step.id <= currentStep;
                const isCompleted = step.id < currentStep;

                return (
                    <div key={step.id} className="flex flex-col items-center relative z-10 w-full">
                        {/* Connector Line */}
                        {index !== 0 && (
                            <div
                                className={`absolute top-4 right-1/2 w-full h-[2px] -translate-y-1/2 -z-10
                ${isActive ? 'bg-indigo-500' : 'bg-slate-800'}`}
                            />
                        )}

                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300
              ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
                        >
                            {isCompleted ? '✓' : step.id}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                            {step.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
