import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-institutional p-4 rounded-2xl shadow-2xl border border-white/10 min-w-[150px] backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">{label.toUpperCase()}</p>
                <div className="space-y-2">
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                <p className="text-[11px] font-bold text-foreground/80">{entry.name}</p>
                            </div>
                            <p className="text-[11px] font-black text-foreground">
                                ${entry.value.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const MainChart = ({ coins, timeRange = '7D' }) => {
    const chartData = useMemo(() => {
        if (!coins || coins.length === 0) return [];
        if (!coins[0].sparkline_in_7d || !coins[0].sparkline_in_7d.price) return [];

        let prices = coins[0].sparkline_in_7d.price;
        let sliceCount = prices.length;

        // Simulamos diferentes rangos de tiempo segmentando los datos de la sparkline
        if (timeRange === '1M') sliceCount = Math.floor(prices.length * 0.5);
        if (timeRange === '1Y') sliceCount = Math.floor(prices.length * 0.2);

        const samples = prices.slice(0, sliceCount);
        const maxEntries = samples.length;

        return Array.from({ length: maxEntries }, (_, i) => {
            const labelText = timeRange === '7D'
                ? `Día ${Math.floor(i / (maxEntries / 7)) + 1} ${Math.floor((i % (maxEntries / 7)) * (24 / (maxEntries / 7)))}:00`
                : `Secuencia ${timeRange} - Punto ${i + 1}`;

            const dataPoint = { name: labelText };
            coins.slice(0, 5).forEach(coin => {
                const coinPrices = coin.sparkline_in_7d.price;
                dataPoint[coin.name] = coinPrices[i] || coinPrices[coinPrices.length - 1];
            });
            return dataPoint;
        });
    }, [coins, timeRange]);

    const colors = [
        '#8b5cf6', // Violeta
        '#06b6d4', // Cian
        '#10b981', // Esmeralda
        '#f59e0b', // Ámbar
        '#ec4899'  // Rosa
    ];

    if (chartData.length === 0) return (
        <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground font-bold italic">
            Esperando Feed del Mercado...
        </div>
    );

    return (
        <div className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        {coins.slice(0, 5).map((coin, i) => (
                            <linearGradient key={coin.id} id={`color${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[i]} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsla(var(--border), 0.1)" />
                    <XAxis
                        dataKey="name"
                        hide={true}
                    />
                    <YAxis
                        hide={false}
                        tick={{ fontSize: 10, fontWeight: '700', fill: 'hsla(var(--muted-foreground), 0.5)' }}
                        axisLine={false}
                        tickLine={false}
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: 'hsla(var(--primary), 0.2)', strokeWidth: 2 }}
                    />
                    {coins.slice(0, 5).map((coin, i) => (
                        <Area
                            key={coin.id}
                            type="monotone"
                            dataKey={coin.name}
                            stroke={colors[i]}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill={`url(#color${i})`}
                            animationDuration={1500}
                            dot={false}
                            activeDot={{ r: 4, stroke: 'white', strokeWidth: 2, fill: colors[i] }}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                {coins.slice(0, 5).map((coin, i) => (
                    <div key={coin.id} className="flex items-center gap-2 group cursor-help">
                        <div className="w-2.5 h-2.5 rounded-full transition-all group-hover:scale-125 shadow-lg shadow-black/20" style={{ backgroundColor: colors[i] }} />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">{coin.symbol}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainChart;
