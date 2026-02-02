import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight, Filter } from 'lucide-react';

const CoinTable = ({ coins, triggerModal }) => {
    const handleRowClick = (coin) => {
        if (triggerModal) {
            triggerModal(
                `Terminal Estratégica: ${coin.symbol.toUpperCase()}`,
                `Cargando análisis de liquidez y flujo de órdenes para ${coin.name}. Calibración de profundidad en tiempo real en curso.`,
                'info'
            );
        }
    };

    return (
        <div className="overflow-x-auto -mx-2">
            <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-muted-foreground">
                        <th className="pb-2 font-black text-[10px] uppercase tracking-[0.2em] px-4">Rank</th>
                        <th className="pb-2 font-black text-[10px] uppercase tracking-[0.2em]">Activo</th>
                        <th className="pb-2 font-black text-[10px] uppercase tracking-[0.2em] text-right">Precio</th>
                        <th className="pb-2 font-black text-[10px] uppercase tracking-[0.2em] text-right">Cambio 24h</th>
                        <th className="pb-2 font-black text-[10px] uppercase tracking-[0.2em] text-right hidden lg:table-cell">Cap. de Mercado</th>
                        <th className="pb-2 font-black text-[10px] uppercase tracking-[0.2em] text-right px-4">
                            <Filter className="w-3 h-3 ml-auto hover:text-primary cursor-pointer transition-colors" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin, index) => (
                        <tr
                            key={coin.id}
                            onClick={() => handleRowClick(coin)}
                            className="group cursor-pointer transition-all duration-300"
                        >
                            <td className="py-4 px-4 bg-muted/20 group-hover:bg-primary/10 rounded-l-3xl text-[11px] font-black text-muted-foreground transition-all duration-300">
                                #{coin.market_cap_rank}
                            </td>
                            <td className="py-4 bg-muted/20 group-hover:bg-primary/10 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-md" />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm tracking-tight group-hover:text-primary transition-colors">{coin.name}</h4>
                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">{coin.symbol}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 bg-muted/20 group-hover:bg-primary/10 text-right transition-all duration-300">
                                <p className="font-black text-sm tracking-tight">${coin.current_price.toLocaleString()}</p>
                            </td>
                            <td className="py-4 bg-muted/20 group-hover:bg-primary/10 text-right transition-all duration-300">
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black ${coin.price_change_percentage_24h >= 0
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-rose-500/10 text-rose-500'
                                    }`}>
                                    {coin.price_change_percentage_24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </div>
                            </td>
                            <td className="py-4 bg-muted/20 group-hover:bg-primary/10 text-right hidden lg:table-cell transition-all duration-300">
                                <p className="text-xs font-extrabold">${(coin.market_cap / 1e9).toFixed(2)}B</p>
                                <p className="text-[9px] text-muted-foreground font-bold mt-1 uppercase tracking-widest leading-none">Capitalización</p>
                            </td>
                            <td className="py-4 px-4 bg-muted/20 group-hover:bg-primary/10 rounded-r-3xl text-right transition-all duration-300">
                                <button className="p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoinTable;
