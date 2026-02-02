import React, { useState, useEffect } from 'react';
import { getCoinsList, getGlobalData } from './services/api';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CoinTable from './components/CoinTable';
import StatsOverview from './components/StatsOverview';
import MainChart from './components/MainChart';
import Modal from './components/Modal';
import { ThemeProvider } from './components/ThemeContext';
import { Activity, TrendingUp, Zap, AlertCircle, Sparkles, LayoutDashboard, Construction } from 'lucide-react';

function ComingSoon({ view }) {
  const titles = {
    Exchanges: 'Mercados',
    Portfolio: 'Portafolio',
    Vault: 'Bóveda',
    Access: 'Acceso'
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-700">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        <Construction className="w-20 h-20 text-primary relative z-10" />
      </div>
      <div>
        <h2 className="text-3xl font-black tracking-tighter uppercase">Protocolo de {titles[view] || view}</h2>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">Este módulo cuantitativo se está calibrando actualmente para la sincronización de todo el mercado.</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/40 hover:scale-105 transition-all text-xs tracking-widest uppercase"
      >
        Recuperar Señal
      </button>
    </div>
  );
}

function DashboardContent({ searchTerm, setSearchTerm }) {
  const [coins, setCoins] = useState([]);
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeRange, setTimeRange] = useState('7D');

  // Estado del Modal
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  const triggerModal = (title, message, type = 'info') => {
    setModalConfig({ isOpen: true, title, message, type });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coinsData, global] = await Promise.all([
          getCoinsList(),
          getGlobalData()
        ]);

        if (coinsData) setCoins(coinsData);
        if (global?.data) setGlobalData(global.data);
      } catch (err) {
        console.error("Error al cargar datos del panel:", err);
        setError("Enlace de mercado limitado. Simulación activa.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCoins = Array.isArray(coins) ? coins.filter(coin =>
    coin?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-all duration-300">
      <div className="bg-mesh" />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} triggerModal={triggerModal} />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-500 lg:pl-72">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} triggerModal={triggerModal} />

        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-10 max-w-7xl relative z-10 w-full mx-auto">
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4 text-amber-500 text-[10px] sm:text-xs font-bold backdrop-blur-md">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
              <button onClick={() => window.location.reload()} className="px-3 py-1 bg-amber-500/10 rounded-lg">Reintentar</button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 animate-ping absolute" />
                <div className="w-16 h-16 rounded-full border-t-2 border-primary animate-spin" />
              </div>
              <p className="text-[10px] font-black tracking-[0.3em] text-primary uppercase animate-pulse">Sincronizando Mercados</p>
            </div>
          ) : activeTab === 'Overview' ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Terminal de Mercado</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase">Análisis del Mercado</h2>
                <p className="text-muted-foreground font-medium text-sm sm:text-base max-w-2xl">Información de grado institucional y flujo de órdenes global.</p>
              </header>

              <StatsOverview data={globalData} />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10">
                <div className="xl:col-span-2 space-y-10">
                  <section className="glass-institutional rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 sm:mb-10">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black flex items-center gap-3">
                            <Activity className="w-5 h-5 text-primary" />
                            Índice de Rendimiento
                          </h3>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Movimiento de Activos ({timeRange})</p>
                        </div>
                        <div className="flex bg-muted/30 p-1 rounded-xl sm:rounded-2xl gap-1 border border-white/5 w-fit">
                          {['7D', '1M', '1Y'].map(t => (
                            <button
                              key={t}
                              onClick={() => setTimeRange(t)}
                              className={`px-4 sm:px-6 py-1.5 rounded-lg sm:rounded-xl text-[10px] font-black transition-all ${timeRange === t ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-muted-foreground hover:bg-white/5'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <MainChart coins={coins.slice(0, 5)} timeRange={timeRange} />
                    </div>
                  </section>

                  <section className="glass-institutional rounded-[2.5rem] p-6 sm:p-10">
                    <div className="flex items-center justify-between mb-8 sm:mb-10">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black">Explorador de Activos</h3>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{filteredCoins.length} Monedas Activas</p>
                      </div>
                      <button
                        onClick={() => triggerModal('Escaneo de Portafolio', 'El escáner automático de portafolio se está iniciando. Patrones de alta frecuencia detectados.', 'success')}
                        className="p-3 bg-muted/50 rounded-2xl border border-white/5 hover:bg-primary/10 text-primary transition-all"
                      >
                        <Zap className="w-4 h-4 fill-primary/20" />
                      </button>
                    </div>
                    <CoinTable coins={filteredCoins} triggerModal={triggerModal} />
                  </section>
                </div>

                <aside className="space-y-10">
                  <section className="glass-institutional rounded-[2.5rem] p-8 sm:p-10">
                    <h3 className="text-xl font-black mb-6 flex items-center justify-between">
                      Tendencias
                      <Sparkles className="w-4 h-4 text-primary" />
                    </h3>
                    <div className="space-y-6">
                      {coins.slice(0, 5).map((coin, i) => (
                        <div
                          key={coin?.id || i}
                          onClick={() => triggerModal('Análisis de Activo', `El análisis estratégico detallado para ${coin?.name} está disponible en la Terminal Institucional Pro.`, 'info')}
                          className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <img src={coin?.image} alt={coin?.name} className="w-10 h-10 rounded-2xl shadow-lg group-hover:scale-110 transition-all" />
                            <div>
                              <p className="font-black text-sm group-hover:text-primary transition-colors">{coin?.name}</p>
                              <p className="text-[10px] text-muted-foreground font-black uppercase">{coin?.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black">${coin?.current_price?.toLocaleString()}</p>
                            <p className={`text-[10px] font-black ${coin?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-rose-500'}`}>
                              {coin?.price_change_percentage_24h >= 0 ? '+' : ''}{coin?.price_change_percentage_24h?.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-gradient-to-br from-primary to-accent rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 group cursor-pointer" onClick={() => triggerModal('Protocolo de Seguridad', 'Su conexión de nodo está cifrada. Se requiere MFA para modificaciones del protocolo.', 'success')}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
                    <div className="relative z-10">
                      <p className="text-[10px] font-black text-white/60 mb-2 tracking-widest uppercase">Protocolo del Sistema</p>
                      <h4 className="text-xl sm:text-2xl font-black leading-tight mb-4 text-white">SEGURIDAD DE GRADO INSTITUCIONAL</h4>
                      <p className="text-xs text-white/70 mb-8 leading-relaxed">Pipeline de datos cifrado con algoritmos SHA de 256 bits y verificación descentralizada.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-bold text-white/50 uppercase mb-1">Estado</p>
                          <p className="text-lg font-black text-white">Activo</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/5">
                          <p className="text-[8px] font-bold text-white/50 uppercase mb-1">Latencia</p>
                          <p className="text-lg font-black text-white">~40ms</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          ) : (
            <ComingSoon view={activeTab} />
          )}
        </main>

        <Modal
          isOpen={modalConfig.isOpen}
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
        />
      </div>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ThemeProvider>
      <DashboardContent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </ThemeProvider>
  );
}

export default App;
