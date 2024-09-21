'use client'

// components/RealEstateListingsGrid.tsx
import React, { useState } from 'react';
import DataGrid from './DataGrid';
import FilterSidebar from './FilterSidebar';

interface Property {
  id: number;
  address: string;
  price: number;
  estimatedValue: number;
  mlsStatus: string;
  sqFt: number;
  pricePerSqFt: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  daysOnMarket: number;
}

type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
};

const sampleData : Property[] = [
  {
    id: 1,
    address: "21155 Gosling Rd",
    price: 499000,
    estimatedValue: 561696,
    mlsStatus: "Active",
    sqFt: 3944,
    pricePerSqFt: 126.52,
    bedrooms: 12,
    bathrooms: 8,
    yearBuilt: 2019,
    daysOnMarket: 10,
  },
  {
    id: 2,
    address: "123 Elm St",
    price: 650000,
    estimatedValue: 700000,
    mlsStatus: "Pending",
    sqFt: 2800,
    pricePerSqFt: 232.14,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2015,
    daysOnMarket: 20,
  },
  {
    id: 3,
    address: "456 Oak Ave",
    price: 800000,
    estimatedValue: 850000,
    mlsStatus: "Sold",
    sqFt: 4200,
    pricePerSqFt: 190.48,
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2020,
    daysOnMarket: 30,
  },
  {
    id: 4,
    address: "789 Pine St",
    price: 550000,
    estimatedValue: 600000,
    mlsStatus: "Active",
    sqFt: 3000,
    pricePerSqFt: 183.33,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2018,
    daysOnMarket: 15,
  },
  {
    id: 5,
    address: "101 Maple Ave",
    price: 700000,
    estimatedValue: 750000,
    mlsStatus: "Pending",
    sqFt: 3500,
    pricePerSqFt: 200.00,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2017,
    daysOnMarket: 25,
  },
  {
    id: 6,
    address: "202 Birch St",
    price: 900000,
    estimatedValue: 950000,
    mlsStatus: "Sold",
    sqFt: 4500,
    pricePerSqFt: 200.00,
    bedrooms: 6,
    bathrooms: 5,
    yearBuilt: 2016,
    daysOnMarket: 40,
  },
  {
    id: 7,
    address: "303 Cedar Ave",
    price: 600000,
    estimatedValue: 650000,
    mlsStatus: "Active",
    sqFt: 3200,
    pricePerSqFt: 187.50,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2014,
    daysOnMarket: 20,
  },
  {
    id: 8,
    address: "404 Walnut St",
    price: 750000,
    estimatedValue: 800000,
    mlsStatus: "Pending",
    sqFt: 3800,
    pricePerSqFt: 197.37,
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2013,
    daysOnMarket: 30,
  },
  {
    id: 9,
    address: "505 Spruce Ave",
    price: 850000,
    estimatedValue: 900000,
    mlsStatus: "Sold",
    sqFt: 4000,
    pricePerSqFt: 212.50,
    bedrooms: 6,
    bathrooms: 5,
    yearBuilt: 2012,
    daysOnMarket: 35,
  },
  {
    id: 10,
    address: "606 Chestnut St",
    price: 950000,
    estimatedValue: 1000000,
    mlsStatus: "Active",
    sqFt: 4300,
    pricePerSqFt: 220.93,
    bedrooms: 7,
    bathrooms: 6,
    yearBuilt: 2011,
    daysOnMarket: 45,
  },
  {
    id: 11,
    address: "123 Cinnamon St",
    price: 520000,
    estimatedValue: 570000,
    mlsStatus: "Active",
    sqFt: 4300,
    pricePerSqFt: 220.93,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2018,
    daysOnMarket: 4,
  }
];

const RealEstateListingsGrid: React.FC = () => {
  
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filteredData, setFilteredData] = useState(sampleData);
  const [currentFilters, setCurrentFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minEstimatedValue: '',
    maxEstimatedValue: '',
    mlsStatus: '',
    minYearBuilt: '',
    maxYearBuilt: '',
    minDaysOnMarket: '',
    maxDaysOnMarket: '',
  });

  const calculateActiveFilterCount = (filters: typeof currentFilters) => {
    return Object.values(filters).filter(value => value !== '').length;
  };
  
  const handleFilter = (filters: typeof currentFilters ) => {

    setCurrentFilters(filters);
    
    setActiveFilterCount(calculateActiveFilterCount(filters));

    // Apply the filters to the sampleData and update the filteredData state
    const filtered = sampleData.filter((property) => {

      // Price Filter
      // Max Price Filter
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) {
        return false;
      }

      // Min Estimated Value Filter
      if (filters.minEstimatedValue && property.estimatedValue < Number(filters.minEstimatedValue)) {
        return false;
      }

      // Max Estimated Value Filter
      if (filters.maxEstimatedValue && property.estimatedValue > Number(filters.maxEstimatedValue)) {
        return false;
      }
        
      // MLS Status filter
      if (filters.mlsStatus && property.mlsStatus !== filters.mlsStatus) {
        return false;
      }
      // Min Year Built Filter
      if (filters.minYearBuilt && property.yearBuilt < Number(filters.minYearBuilt)) {
        return false;
      }

      // Max Year Built Filter
      if (filters.maxYearBuilt && property.yearBuilt > Number(filters.maxYearBuilt)) {
        return false;
      }

      // Min Days on Market Filter
      if (filters.minDaysOnMarket && property.daysOnMarket < Number(filters.minDaysOnMarket)) {
        return false;
      }

      // Max Days on Market Filter
      if (filters.maxDaysOnMarket && property.daysOnMarket > Number(filters.maxDaysOnMarket)) {
        return false;
      }
      
      // ... (add more filter conditions)
      return true;
    });
    
    setFilteredData(filtered);
    // setShowFilterSidebar(false);
  };


  const columns: Column<Property>[] = React.useMemo(() => [
    { key: 'address', header: 'Property Address', sortable: true },
    { 
      key: 'price', 
      header: 'Price', 
      sortable: true,
      render: (value) => `$${(value as number).toLocaleString()}`
    },
    { 
      key: 'estimatedValue', 
      header: 'Estimated Value', 
      sortable: true,
      render: (value) => `$${(value as number).toLocaleString()}`
    },
    { key: 'mlsStatus', header: 'MLS Status', sortable: true },
    { 
      key: 'sqFt', 
      header: 'Sq Ft', 
      sortable: true,
      render: (value) => (value as number).toLocaleString()
    },
    { 
      key: 'pricePerSqFt', 
      header: 'Price/Sq Ft', 
      sortable: true,
      render: (value) => `$${(value as number).toFixed(2)}`
    },
    { key: 'bedrooms', header: 'Bedrooms', sortable: true },
    { key: 'bathrooms', header: 'Bathrooms', sortable: true },
    { key: 'yearBuilt', header: 'Year Built', sortable: true },
    { key: 'daysOnMarket', header: 'Days On Market', sortable: true },
  ], []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Filter App</h1>
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-gray-200 rounded-md flex items-center">
            <span className="mr-1">🔔</span>
          </button>
          <button className="px-2 py-1 bg-gray-200 rounded-md flex items-center">
            <span className="mr-1">❓</span>
          </button>
          <button className="px-2 py-1 bg-gray-200 rounded-md flex items-center">
            <span className="mr-1">⋮⋮</span>
          </button>
          <button className="px-4 py-1 bg-blue-600 text-white rounded-md">
            +
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md flex items-center" onClick={() => setShowFilterSidebar(!showFilterSidebar)}>
            <span className="mr-2">≡</span> All Filters <span className="ml-1 bg-gray-400 rounded-full px-2 filterCount">{activeFilterCount}</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-md flex items-center">
            <span className="mr-2">👥</span> View Settings
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {sampleData.length} properties
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center">
          <span className="mr-2">+</span> Save
        </button>
      </div>

      {showFilterSidebar && (
        <FilterSidebar
          onClose={() => setShowFilterSidebar(false)}
          onFilter={handleFilter}
          currentFilters={currentFilters}
        />
      )}

      <DataGrid
        data={filteredData}
        columns={columns}
        itemsPerPage={10}
      />
    </div>
  );
};

export default RealEstateListingsGrid;