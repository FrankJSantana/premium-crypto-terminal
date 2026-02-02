import React from 'react';
import { TrendingUp, BarChart3, Activity, PieChart, Info } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="glass-institutional p-6 rounded-3xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden cursor-help">
        <div className="flex justify-between items-start relative z-10">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</p>
                    <Info className="w-3 h-3 text-muted-foreground/30" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tighter group-hover:translate-x-1 transition-transform">{value}</h3>
                    {change !== undefined && (
                        <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-black ${change >= 0 ? 'text-green-400' : 'text-rose-400'}`}>
                            <span>{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
                            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase ml-1 opacity-50">24h</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-primary border border-white/5">
                <Icon className="w-6 h-6" />
            </div>
        </div>
    </div>
);

const StatsOverview = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Cap. de Mercado"
                value={`$${(data.total_market_cap.usd / 1e12).toFixed(2)}T`}
                change={data.market_cap_change_percentage_24h_usd}
                icon={TrendingUp}
                color="indigo"
            />
            <StatCard
                title="Volumen 24h"
                value={`$${(data.total_volume.usd / 1e9).toFixed(2)}B`}
                icon={BarChart3}
                color="emerald"
            />
            <StatCard
                title="Activos Activos"
                value={data.active_cryptocurrencies.toLocaleString()}
                icon={Activity}
                color="amber"
            />
            <StatCard
                title="Dominio BTC"
                value={`${data.market_cap_percentage.btc.toFixed(1)}%`}
                icon={PieChart}
                color="rose"
            />
        </div>
    );
};

export default StatsOverview;
