'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, BarChart3, Table2 } from 'lucide-react';
import GisIndicatorLineChart from '@/components/charts/GisIndicatorLineChart';
import {
  filterOptions,
  yearlyStats,
  provinceTableData,
  indikatorMeta,
  filterYearlyStats,
  formatTon,
  type IndikatorType,
} from '@/data/gisDashboardContent';

const dashboardCharts: IndikatorType[] = [
  'Produksi',
  'Luas Panen',
  'Produktivitas',
  'Supply Demand',
];

const GisOpenStreetMap = dynamic(() => import('@/components/GisOpenStreetMap'), {
  ssr: false,
});

function DashboardCard({
  title,
  icon: Icon,
  children,
  className = '',
  bodyClassName = '',
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-slate-100 flex items-center gap-2.5">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-elevarm-cobalt/10 text-elevarm-cobalt">
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-sm sm:text-[15px] font-semibold text-slate-800 leading-snug pr-2">{title}</h3>
      </div>
      <div className={bodyClassName || 'p-4 sm:p-5'}>{children}</div>
    </div>
  );
}

type AppliedFilters = {
  subsektor: string;
  komoditas: string;
  indikator: IndikatorType;
  tahunAwal: string;
  tahunAkhir: string;
};

const defaultFilters: AppliedFilters = {
  subsektor: filterOptions.subsektor[0],
  komoditas: filterOptions.komoditas[0],
  indikator: filterOptions.indikator[0],
  tahunAwal: filterOptions.tahunAwal[0],
  tahunAkhir: filterOptions.tahunAkhir[3],
};

export default function GisDashboard() {
  const [subsektor, setSubsektor] = useState(defaultFilters.subsektor);
  const [komoditas, setKomoditas] = useState(defaultFilters.komoditas);
  const [indikator, setIndikator] = useState<IndikatorType>(defaultFilters.indikator);
  const [tahunAwal, setTahunAwal] = useState(defaultFilters.tahunAwal);
  const [tahunAkhir, setTahunAkhir] = useState(defaultFilters.tahunAkhir);
  const [applied, setApplied] = useState<AppliedFilters>(defaultFilters);

  const chartData = useMemo(
    () => filterYearlyStats(yearlyStats, applied.tahunAwal, applied.tahunAkhir),
    [applied.tahunAwal, applied.tahunAkhir],
  );
  const tableRows = useMemo(() => provinceTableData, []);
  const activeMeta = indikatorMeta[applied.indikator];

  const applyFilters = () => {
    setApplied({ subsektor, komoditas, indikator, tahunAwal, tahunAkhir });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="bg-white border-b border-slate-200 shadow-sm pt-header sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-elevarm-accent mb-1">GIS Dashboard</p>
            <h1 className="text-xl sm:text-2xl font-bold text-elevarm-denim font-display">Supply & Demand Hortikultura</h1>
            <p className="text-sm text-slate-500 mt-1">Visualisasi sebaran supply per provinsi di Indonesia</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            {[
              { label: 'Subsektor', value: subsektor, options: filterOptions.subsektor },
              { label: 'Komoditas', value: komoditas, options: filterOptions.komoditas },
              { label: 'Indikator', value: indikator, options: filterOptions.indikator },
              { label: 'Tahun Awal', value: tahunAwal, options: filterOptions.tahunAwal },
              { label: 'Tahun Akhir', value: tahunAkhir, options: filterOptions.tahunAkhir },
            ].map((field) => (
              <div key={field.label} className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">{field.label}</label>
                <select
                  value={field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    switch (field.label) {
                      case 'Subsektor':
                        setSubsektor(val);
                        break;
                      case 'Komoditas':
                        setKomoditas(val);
                        break;
                      case 'Indikator': {
                        const next = val as IndikatorType;
                        setIndikator(next);
                        setApplied((prev) => ({ ...prev, indikator: next }));
                        break;
                      }
                      case 'Tahun Awal':
                        setTahunAwal(val);
                        break;
                      case 'Tahun Akhir':
                        setTahunAkhir(val);
                        break;
                    }
                  }}
                  className="gis-select"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
            <button type="button" className="gis-search-btn col-span-2 md:col-span-1 lg:col-start-6" onClick={applyFilters}>
              <Search className="w-4 h-4" />
              Cari Data
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Indikator aktif:</span>
            <span className="inline-flex items-center rounded-full bg-[#135122] px-3 py-1 text-xs font-semibold text-white">
              {applied.indikator}
            </span>
            <span className="text-xs text-slate-400">
              {applied.subsektor} · {applied.komoditas} · {applied.tahunAwal}–{applied.tahunAkhir}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <DashboardCard
            title="Peta Sebaran Supply Hortikultura (Dalam Ton)"
            icon={MapIcon}
            bodyClassName="p-2 sm:p-3"
            className="lg:col-span-2"
          >
            <GisOpenStreetMap size="full" mapLegendTitle={activeMeta.mapLegendTitle} />
          </DashboardCard>

          {dashboardCharts.map((chartIndikator) => {
            const meta = indikatorMeta[chartIndikator];
            const isActive = applied.indikator === chartIndikator;
            return (
              <DashboardCard
                key={chartIndikator}
                title={meta.chartTitle}
                icon={BarChart3}
                className={isActive ? 'ring-2 ring-elevarm-cobalt/40 shadow-md' : ''}
              >
                <GisIndicatorLineChart indikator={chartIndikator} data={chartData} compact />
              </DashboardCard>
            );
          })}

          <DashboardCard
            title="Supply Hortikultura 5 Tahun Terakhir (Dalam Ton)"
            icon={Table2}
            className="lg:col-span-2"
          >
            <div className="overflow-auto max-h-[300px] rounded-lg border border-slate-100">
              <table className="w-full text-xs text-left border-collapse min-w-[520px]">
                <thead className="sticky top-0 bg-slate-50 z-10">
                  <tr className="border-b border-slate-200">
                    <th className="py-2.5 px-3 font-semibold text-slate-600">Provinsi</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">2021</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">2022</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">2023</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">2024</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">2025</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-600 text-right">Pertumbuhan (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr
                      key={row.province}
                      className={`border-b border-slate-100 hover:bg-elevarm-cobalt/5 transition-colors ${
                        i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-medium text-slate-700">{row.province}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">{formatTon(row.y2021)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">{formatTon(row.y2022)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">{formatTon(row.y2023)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">{formatTon(row.y2024)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">{formatTon(row.y2025)}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                            row.growth >= 0 ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        >
                          {row.growth >= 0 ? '▲' : '▼'} {Math.abs(row.growth).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l-6-3V6l6 3 6-3 6 3v9l-6 3-6-3z" />
      <path d="M9 6v12M15 3v12" />
    </svg>
  );
}
