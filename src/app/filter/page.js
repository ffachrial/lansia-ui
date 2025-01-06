'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function BalitaFilterPage() {
  const [selectedRT, setSelectedRT] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);

  const router = useRouter(); // Initialize useRouter for navigation

  const rtOptions = ['RT 1', 'RT 2', 'RT 3', 'RT 4', 'RT 5'];
  const ageOptions = ['0 - 5 Bulan', '6 - 11 Bulan', '12 - 23 Bulan', '24 - 59 Bulan'];

  const handleRTChange = (rt) => {
    setSelectedRT((prev) =>
      prev.includes(rt) ? prev.filter((item) => item !== rt) : [...prev, rt]
    );
  };

  const handleAgeChange = (age) => {
    setSelectedAge((prev) =>
      prev.includes(age) ? prev.filter((item) => item !== age) : [...prev, age]
    );
  };

  const clearRTSelection = () => setSelectedRT([]);
  const clearAgeSelection = () => setSelectedAge([]);

  const applyFilters = () => {
    try {
      // Map age options to month ranges
      const ageRanges = {
        '0 - 5 Bulan': { min: 0, max: 5 },
        '6 - 11 Bulan': { min: 6, max: 11 },
        '12 - 23 Bulan': { min: 12, max: 23 },
        '24 - 59 Bulan': { min: 24, max: 59 },
      };

      // Prepare query parameters
      const query = {
        rt: selectedRT.map((rt) => rt.replace('RT ', '')).join(','), // Convert RT array to comma-separated string
        age: selectedAge.map((age) => {
          const range = ageRanges[age];
          return `${range.min}-${range.max}`;
        }).join(','), // Convert Age array to comma-separated string of ranges
      };

      console.log('Navigating with query:', query);

      // Navigate with proper pathname and query
      router.push(`/posyandu?rt=${query.rt}&age=${query.age}`);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };
      
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold">Filter Balita</h1>
      </header>

      {/* Filter by RT */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filter by RT</h2>
          <button
            onClick={clearRTSelection}
            className="text-sm text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
        <div className="space-y-2">
          {rtOptions.map((rt) => (
            <label key={rt} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedRT.includes(rt)}
                onChange={() => handleRTChange(rt)}
              />
              <span>{rt}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Filter by Umur */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filter by Umur</h2>
          <button
            onClick={clearAgeSelection}
            className="text-sm text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
        <div className="space-y-2">
          {ageOptions.map((age) => (
            <label key={age} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAge.includes(age)}
                onChange={() => handleAgeChange(age)}
              />
              <span>{age}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Apply Filters Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={applyFilters}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
