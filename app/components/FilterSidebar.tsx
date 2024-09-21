// components/FilterSidebar.tsx
import React, { useState } from 'react';


interface FilterOptions {
    minPrice: string;
    maxPrice: string;
    minEstimatedValue: string;
    maxEstimatedValue: string;
    mlsStatus: string;
    minYearBuilt: string;
    maxYearBuilt: string;
    minDaysOnMarket: string;
    maxDaysOnMarket: string;
}

interface FilterSidebarProps {
  onClose: () => void;
  onFilter: (filters: FilterOptions ) => void;
  currentFilters: FilterOptions;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onClose, onFilter, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ 
        ...prevFilters, 
        [name]: value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
        minPrice: '',
        maxPrice: '',
        minEstimatedValue: '',
        maxEstimatedValue: '',
        mlsStatus: '',
        minYearBuilt: '',
        maxYearBuilt: '',
        minDaysOnMarket: '',
        maxDaysOnMarket: '',
      };
      setFilters(resetFilters);
      onFilter(resetFilters); // This will update the parent component's state
  };

  return (
    <div className="fixed inset-0 flex z-40">
      <div className="fixed inset-0 bg-black opacity-25" onClick={onClose}></div>
      <div className="ml-auto bg-white w-96 p-6 relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Min Price Input */}
          <div className="mb-4">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Max Price Input */}
          <div className="mb-4">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="minEstimatedValue" className="block mb-2">Min Estimated Value:</label>
            <input
              type="number"
              id="minEstimatedValue"
              name="minEstimatedValue"
              value={filters.minEstimatedValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxEstimatedValue" className="block mb-2">Max Estimated Value:</label>
            <input
              type="number"
              id="maxEstimatedValue"
              name="maxEstimatedValue"
              value={filters.maxEstimatedValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mlsStatus" className="block mb-2">MLS Status:</label>
            <select
              id="mlsStatus"
              name="mlsStatus"
              value={filters.mlsStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md">
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Sold">Sold</option>
            </select>
            </div>
            <div className="mb-4">
            <label htmlFor="minYearBuilt" className="block mb-2">Min Year Built:</label>
            <input
                type="number"
                id="minYearBuilt"
                name="minYearBuilt"
                value={filters.minYearBuilt}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
            <label htmlFor="maxYearBuilt" className="block mb-2">Max Year Built:</label>
            <input
                type="number"
                id="maxYearBuilt"
                name="maxYearBuilt"
                value={filters.maxYearBuilt}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
            <label htmlFor="minDaysOnMarket" className="block mb-2">Min Days on Market:</label>
            <input
                type="number"
                id="minDaysOnMarket"
                name="minDaysOnMarket"
                value={filters.minDaysOnMarket}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
            <label htmlFor="maxDaysOnMarket" className="block mb-2">Max Days on Market:</label>
            <input
                type="number"
                id="maxDaysOnMarket"
                name="maxDaysOnMarket"
                value={filters.maxDaysOnMarket}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                />
            </div>
          {/* Add remaining filter inputs */}
          <div className="flex justify-between">
          <button type="button" className="resetFilters border border-blue-500 text-blue-500 px-4 py-2 rounded" onClick={handleReset}>
            Reset All
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Apply Filters
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSidebar;