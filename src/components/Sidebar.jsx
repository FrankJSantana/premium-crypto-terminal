import React from 'react';
import {
    LayoutDashboard,
    TrendingUp,
    Wallet,
    Settings,
    Sun,
    Moon,
    LogOut,
    Database,
    PieChart,
    ShieldCheck,
    Zap,
    Copyright
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl sm:rounded-2xl transition-all duration-500 group relative overflow-hidden ${active
                ? 'glass-institutional text-white shadow-xl shadow-primary/20 bg-primary/20 border-primary/30'
                : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
            }`}
    >
        <div className="flex items-center gap-4 relative z-10">
            <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'group-hover:text-primary transition-colors'}`} />
            <span className={`font-bold text-xs uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{label}</span>
        </div>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(139,92,246,0.8)] relative z-10" />}
    </button>
);

const Sidebar = ({ activeTab = 'General', setActiveTab, triggerModal }) => {
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        { id: 'Overview', icon: LayoutDashboard, label: 'General' },
        { id: 'Exchanges', icon: TrendingUp, label: 'Mercados' },
        { id: 'Portfolio', icon: PieChart, label: 'Portafolio' },
        { id: 'Vault', icon: Wallet, label: 'Bóveda' },
    ];

    const handleAction = (title, message, type = 'info') => {
        if (triggerModal) {
            triggerModal(title, message, type);
        }
    };

    return (
        <>
            {/* Mobile Top Navigation Fallback */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-t border-white/5 z-[60] flex items-center justify-around px-6">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab && setActiveTab(item.id)}
                        className={activeTab === item.id ? 'text-primary' : 'text-muted-foreground'}
                    >
                        <item.icon className="w-6 h-6" />
                    </button>
                ))}
                <button onClick={toggleTheme}>
                    {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
            </div>

            <aside className="fixed left-0 top-0 h-screen w-72 p-8 z-50 hidden lg:flex flex-col bg-card/50 backdrop-blur-2xl border-r border-white/5">
                <div className="flex items-center gap-4 mb-14 px-2 group cursor-pointer" onClick={() => setActiveTab('Overview')}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter text-foreground">CryptoDash</h1>
                        <div className="flex items-center gap-1.5 mt-1">
                            <ShieldCheck className="w-3 h-3 text-primary" />
                            <p className="text-[9px] text-primary font-black uppercase tracking-widest leading-none">Nodo Verificado</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-3">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-5 mb-5 opacity-40">Mercados</p>
                    {menuItems.map(item => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab && setActiveTab(item.id)}
                        />
                    ))}

                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] px-5 mb-5 mt-10 opacity-40">Sistema</p>
                    <SidebarItem icon={Settings} label="Acceso" active={activeTab === 'Access'} onClick={() => setActiveTab('Access')} />
                </nav>

                <div className="mt-auto space-y-6">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000" />
                        <div className="relative z-10 text-center">
                            <p className="text-[10px] font-black text-primary tracking-widest uppercase mb-2">Licencia Pro</p>
                            <button
                                onClick={() => handleAction('Terminal Pro', 'Solicitud de acceso a la API cifrada recibida. Verificación de identidad en curso.', 'info')}
                                className="w-full py-3 bg-white/5 hover:bg-primary text-white rounded-xl text-[10px] font-black transition-all duration-500 border border-white/10 uppercase tracking-widest"
                            >
                                Activar API
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                        <button
                            onClick={toggleTheme}
                            className="flex-1 flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            {theme === 'light' ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                            {theme === 'light' ? 'Oscuro' : 'Claro'}
                        </button>
                        <button
                            onClick={() => handleAction('Finalización', 'Cerrando todos los sockets activos y limpiando la caché efímera. Buen viaje.', 'warning')}
                            className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 opacity-30 hover:opacity-100 transition-opacity pb-2">
                        <div className="flex items-center gap-2">
                            <Copyright className="w-3 h-3" />
                            <span className="text-[8px] font-black tracking-widest uppercase">2026 Institutional</span>
                        </div>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-tighter">Franklin Jiménez Santana</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
