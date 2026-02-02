import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
    baseURL: BASE_URL,
});

// Datos de respaldo en caso de errores de CORS o API
export const fallbackCoins = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 65432.21, price_change_percentage_24h: 2.15, market_cap: 1200000000000, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', sparkline_in_7d: { price: Array(168).fill(65000).map((p, i) => p + Math.random() * 1000) }, market_cap_rank: 1 },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3456.78, price_change_percentage_24h: -1.2, market_cap: 400000000000, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', sparkline_in_7d: { price: Array(168).fill(3400).map((p, i) => p + Math.random() * 100) }, market_cap_rank: 2 },
    { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 145.67, price_change_percentage_24h: 5.4, market_cap: 65000000000, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', sparkline_in_7d: { price: Array(168).fill(140).map((p, i) => p + Math.random() * 10) }, market_cap_rank: 5 },
    { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.45, price_change_percentage_24h: 0.1, market_cap: 16000000000, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', sparkline_in_7d: { price: Array(168).fill(0.4).map((p, i) => p + Math.random() * 0.05) }, market_cap_rank: 10 },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot', current_price: 7.21, price_change_percentage_24h: -2.3, market_cap: 10000000000, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', sparkline_in_7d: { price: Array(168).fill(7).map((p, i) => p + Math.random() * 0.5) }, market_cap_rank: 15 }
];

export const fallbackGlobal = {
    data: {
        total_market_cap: { usd: 2.5e12 },
        total_volume: { usd: 85e9 },
        active_cryptocurrencies: 12450,
        market_cap_percentage: { btc: 52.1 },
        market_cap_change_percentage_24h_usd: 1.25
    }
};

export const getCoinsList = async (vsCurrency = 'usd', perPage = 100, page = 1) => {
    try {
        const response = await api.get('/coins/markets', {
            params: {
                vs_currency: vsCurrency,
                order: 'market_cap_desc',
                per_page: perPage,
                page: page,
                sparkline: true,
                price_change_percentage: '24h,7d',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de monedas:', error);
        return fallbackCoins;
    }
};

export const getCoinDetails = async (id) => {
    try {
        const response = await api.get(`/coins/${id}`, {
            params: {
                localization: false,
                tickers: false,
                market_data: true,
                community_data: false,
                developer_data: false,
                sparkline: true,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener detalles de la moneda ${id}:`, error);
        throw error;
    }
};

export const getMarketChart = async (id, days = 7, vsCurrency = 'usd') => {
    try {
        const response = await api.get(`/coins/${id}/market_chart`, {
            params: {
                vs_currency: vsCurrency,
                days: days,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el gráfico de mercado para ${id}:`, error);
        throw error;
    }
};

export const getGlobalData = async () => {
    try {
        const response = await api.get('/global');
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos globales:', error);
        return fallbackGlobal;
    }
};
