import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { WeatherData, CurrencyData } from '../types';
import { CloudSun, Coins, ArrowRightLeft, RefreshCw, ChevronRight } from 'lucide-react';

export const WeatherCurrencyRibbon: React.FC = () => {
  const { lang, t, formatNumber } = useLanguage();
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [calcOpen, setCalcOpen] = useState(false);

  // Mini calculator state
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [calcTarget, setCalcTarget] = useState<string>('BDT');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [wRes, cRes] = await Promise.all([
        fetch('/api/weather'),
        fetch('/api/currency')
      ]);

      if (wRes.ok) {
        const wJson = await wRes.json();
        if (wJson.data) setWeatherList(wJson.data);
      }

      if (cRes.ok) {
        const cJson = await cRes.json();
        if (cJson.data) setCurrencyData(cJson.data);
      }
    } catch (e) {
      console.error('Error fetching weather/currency:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const convertedResult = currencyData?.rates?.[calcTarget]
    ? (calcAmount * currencyData.rates[calcTarget]).toFixed(2)
    : '0.00';

  return (
    <div className="border-b border-stone-200 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-900/60 py-2 px-4 md:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Weather Ticker Strip */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-0.5">
          <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] tracking-wider text-stone-500 shrink-0">
            <CloudSun className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t('weatherTitle')}:</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-stone-700 dark:text-stone-300">
            {weatherList.slice(0, 4).map((w) => (
              <div key={w.city} className="flex items-center gap-1 shrink-0 font-sans">
                <span className="font-semibold text-stone-900 dark:text-stone-100">{w.city}</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">{formatNumber(w.tempC)}°C</span>
                <span className="text-stone-400 text-[10px]">({w.condition})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Rates Strip */}
        <div className="flex items-center gap-3 justify-end shrink-0 overflow-x-auto scrollbar-none py-0.5 border-t md:border-t-0 border-stone-200 dark:border-stone-800 pt-1.5 md:pt-0">
          <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] tracking-wider text-amber-700 dark:text-amber-500 shrink-0">
            <Coins className="w-3.5 h-3.5" />
            <span>USD:</span>
          </div>

          {currencyData && (
            <div className="flex items-center gap-3 font-mono text-stone-700 dark:text-stone-300 shrink-0">
              <span>EUR {currencyData.rates.EUR?.toFixed(2)}</span>
              <span>GBP {currencyData.rates.GBP?.toFixed(2)}</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">BDT {currencyData.rates.BDT?.toFixed(1)}</span>
              <span>SAR {currencyData.rates.SAR?.toFixed(2)}</span>
              <span>AED {currencyData.rates.AED?.toFixed(2)}</span>
            </div>
          )}

          <button
            onClick={() => setCalcOpen(!calcOpen)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors text-[11px] font-sans font-medium shrink-0 ml-1"
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>{lang === 'bn' ? 'রূপান্তর' : 'Convert'}</span>
          </button>
        </div>
      </div>

      {/* Mini Currency Modal Drawer */}
      {calcOpen && (
        <div className="mt-3 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg max-w-lg ml-auto shadow-lg animate-in fade-in">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'bn' ? 'মুদ্রা রূপান্তর ক্যালকুলেটর (লাইভ রেট)' : 'Forex Currency Calculator (Live Rates)'}</span>
            </h4>
            <button
              onClick={() => setCalcOpen(false)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center text-xs">
            <div>
              <label className="block text-[10px] text-stone-500 mb-1">USD Amount</label>
              <input
                type="number"
                value={calcAmount}
                onChange={(e) => setCalcAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] text-stone-500 mb-1">Target Currency</label>
              <select
                value={calcTarget}
                onChange={(e) => setCalcTarget(e.target.value)}
                className="w-full px-2 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                {currencyData &&
                  Object.keys(currencyData.rates).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
              </select>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-900/50">
              <span className="block text-[10px] text-amber-700 dark:text-amber-400">Total Converted:</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">
                {convertedResult} {calcTarget}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 mt-2">
            {lang === 'bn' ? 'উৎস: আন্তর্জাতিক ফরেক্স মার্কেট রেট।' : 'Source: International foreign exchange rate data feeds.'}
          </p>
        </div>
      )}
    </div>
  );
};
