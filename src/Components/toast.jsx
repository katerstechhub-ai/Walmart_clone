function Toast({ toasts }) {
    let icons = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️",
    };

    let colors = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-yellow-500",
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map(function (toast) {
                return (
                    <div
                        key={toast.id}
                        className={`${colors[toast.type]} text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium animate-bounce-in max-w-xs pointer-events-auto`}
                        style={{ animation: "slideIn 0.3s ease" }}
                    >
                        <span className="text-base">{icons[toast.type]}</span>
                        <span>{toast.message}</span>
                    </div>
                );
            })}
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0)   scale(1);    }
                }
            `}</style>
        </div>
    );
}

export default Toast;