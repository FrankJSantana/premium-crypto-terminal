import React from 'react';
import { Search, Bell, User, MessageSquare } from 'lucide-react';

const Navbar = ({ searchTerm, setSearchTerm, triggerModal }) => {
    const handleAction = (title, message, type = 'info') => {
        if (triggerModal) {
            triggerModal(title, message, type);
        }
    };

    return (
        <nav className="sticky top-0 z-40 w-full px-4 sm:px-8 py-4 flex items-center justify-between gap-6 backdrop-blur-xl bg-background/50 border-b border-white/5">
            <div className="flex-1 max-w-2xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Búsqueda Quantum de Activos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-xs sm:text-sm font-bold placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:bg-white/10 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    onClick={() => handleAction('Notificaciones', 'Matriz de señales sincronizada. 0 alertas persistentes encontradas.', 'success')}
                    className="relative p-3 bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all group hidden sm:block"
                >
                    <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-2 ring-background ring-offset-background" />
                </button>

                <button
                    onClick={() => handleAction('Comunicación', 'Enlace seguro desconectado. El servicio de mensajería cifrada P2P se está enrutando actualmente.', 'warning')}
                    className="p-3 bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all group hidden md:block"
                >
                    <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>

                <div className="w-px h-8 bg-white/5 mx-2 hidden sm:block" />

                <button
                    onClick={() => handleAction('Portal de Identidad', 'Identidad de Frank.eth verificada mediante protocolo descentralizado. Acceso seguro concedido.', 'success')}
                    className="flex items-center gap-3 p-1.5 pr-4 bg-primary/10 rounded-2xl border border-primary/20 hover:bg-primary/20 transition-all group"
                >
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left hidden lg:block">
                        <p className="text-[9px] font-black tracking-tighter text-primary uppercase leading-none">Institucional</p>
                        <p className="text-xs font-bold leading-none mt-1">Frank.eth</p>
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
