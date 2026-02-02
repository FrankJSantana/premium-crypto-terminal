import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, message, type = 'info' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const icons = {
        info: <Info className="w-8 h-8 text-primary" />,
        warning: <AlertCircle className="w-8 h-8 text-amber-500" />,
        error: <ShieldAlert className="w-8 h-8 text-rose-500" />,
        success: <CheckCircle className="w-8 h-8 text-emerald-500" />
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Fondo */}
            <div
                className="absolute inset-0 bg-background/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Contenido del Modal */}
            <div className="glass-institutional w-full max-w-md rounded-[2.5rem] p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10 text-foreground">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-muted-foreground hover:text-white"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/5 relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                        <div className="relative z-10">
                            {icons[type]}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-black tracking-tighter uppercase">{title}</h3>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed px-4">
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-[1.02] text-xs tracking-[0.2em] uppercase"
                    >
                        Confirmar Recepción
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
