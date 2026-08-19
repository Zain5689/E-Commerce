'use client';

import React, { useState } from 'react';
import { Filter, ChevronDown, RotateCcw } from 'lucide-react';

export interface FilterOption {
  key: string;
  nameEn: string;
  options: string[];
}

interface SpecsFilterSidebarProps {
  specFilters: FilterOption[];
  onFilterChange: (selectedSpecs: Record<string, string[]>) => void;
}

export const SpecsFilterSidebar: React.FC<SpecsFilterSidebarProps> = ({
  specFilters,
  onFilterChange,
}) => {
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string[]>>({});
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});

  const handleSpecToggle = (key: string, option: string) => {
    const currentList = selectedSpecs[key] || [];
    const isSelected = currentList.includes(option);

    const updatedList = isSelected
      ? currentList.filter((item) => item !== option)
      : [...currentList, option];

    const updatedSpecs = { ...selectedSpecs, [key]: updatedList };
    if (updatedList.length === 0) {
      delete updatedSpecs[key];
    }

    setSelectedSpecs(updatedSpecs);
    onFilterChange(updatedSpecs);
  };

  const handleReset = () => {
    setSelectedSpecs({});
    setSelectedConditions([]);
    setPriceRange({});
    onFilterChange({});
  };

  return (
    <aside className="w-full lg:w-64 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
          <Filter className="w-4 h-4 text-brand-500" /> Filter Specifications
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-brand-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Condition Filter */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
          Condition
        </h4>
        <div className="space-y-2 text-sm">
          {['NEW', 'USED', 'REFURBISHED'].map((cond) => (
            <label key={cond} className="flex items-center gap-2.5 text-slate-300 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedConditions.includes(cond)}
                onChange={() => {
                  const updated = selectedConditions.includes(cond)
                    ? selectedConditions.filter((c) => c !== cond)
                    : [...selectedConditions, cond];
                  setSelectedConditions(updated);
                }}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-brand-600 focus:ring-brand-500"
              />
              <span>{cond === 'NEW' ? 'Brand New' : cond === 'USED' ? 'Used' : 'Refurbished'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Specification Keys (RAM, GPU, CPU, etc.) */}
      {specFilters.map((spec) => (
        <div key={spec.key} className="mb-6 pb-4 border-b border-slate-800/60">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
            {spec.nameEn}
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </h4>
          <div className="space-y-2 text-sm">
            {spec.options.map((option) => {
              const checked = selectedSpecs[spec.key]?.includes(option) || false;
              return (
                <label key={option} className="flex items-center gap-2.5 text-slate-300 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleSpecToggle(spec.key, option)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-brand-600 focus:ring-brand-500"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};
