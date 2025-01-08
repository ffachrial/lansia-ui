'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter and useSearchParams for navigation
import TabNavigation from '@/components/TabNavigation';
import SearchCard from '@/components/SearchCard';
import { fetchData } from '@/lib/fetchData'; // A helper function for fetching data from the API

export default function PosyanduPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hadirBalita, setHadirBalita] = useState([]);
  const [tidakHadirBalita, setTidakHadirBalita] = useState([]);
  const [filteredHadirBalita, setFilteredHadirBalita] = useState([]);
  const [filteredTidakHadirBalita, setFilteredTidakHadirBalita] = useState([]);

  const router = useRouter(); // Initialize useRouter for navigation

  const tabs = [
    {
      name: 'Home',
      route: '/home',
      icon: 'M3.75 12l8.25-8.25L20.25 12v6a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V12z',
    },
    {
      name: 'Posyandu',
      route: '/posyandu?rt=&age=',
      icon: 'M12 4.5v15m-7.5-7.5h15',
    },
    {
      name: 'Posbindu',
      route: '/posbindu',
      icon: 'M12 2a9 9 0 100 18 9 9 0 000-18z',
    },
  ];

  useEffect(() => {
    const fetchResidents = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const rt = urlParams.get('rt');
      const age = urlParams.get('age');
      const query = new URLSearchParams({ rt, age }).toString();
      const { hadirBalita, tidakHadirBalita } = await fetchData(`/api/posyandu?${query}`);
      // console.log('Fetched residents:', { hadirBalita, tidakHadirBalita }); // Debug log

      setHadirBalita(hadirBalita);
      setTidakHadirBalita(tidakHadirBalita);
      setFilteredHadirBalita(hadirBalita);
      setFilteredTidakHadirBalita(tidakHadirBalita);
    };
    fetchResidents();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredHadirBalita(
      hadirBalita.filter((resident) =>
        resident.name.toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredTidakHadirBalita(
      tidakHadirBalita.filter((resident) =>
        resident.name.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, hadirBalita, tidakHadirBalita]);

  const handleFilterPage = () => {
    router.push('/filter'); // Navigate to the filter page
  };

  const handleDetailClick = (residentId) => {
    // console.log('Clicking detail for resident:', residentId);
    router.push(`/posyandu/${residentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Sticky Header Section */}
      <header className="sticky top-0 bg-gray-100 z-10 shadow-md p-4">
        <div className="flex items-center justify-center">
          <div className="flex space-x-4 items-center w-full max-w-2xl">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Cari Balita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-orange-100 border border-yellow-700 focus:outline-none focus:border-amber-500"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleFilterPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Balita hadir Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Balita hadir</h2>
          <a href="#" className="text-sm text-amber-900 hover:underline">See All</a>
        </div>
        <div className="space-y-4">
          {filteredHadirBalita.map((resident) => (
            <SearchCard key={resident.name} resident={resident} onDetailClick={() => handleDetailClick(resident.id)} />
          ))}
        </div>
      </section>

      {/* Balita tidak hadir Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Balita tidak hadir</h2>
          <a href="#" className="text-sm text-amber-900 hover:underline">See All</a>
        </div>
        <div className="space-y-4 pb-16">
          {filteredTidakHadirBalita.map((resident) => (
            <SearchCard key={resident.name} resident={resident} onDetailClick={() => handleDetailClick(resident.id)} />
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} />
    </div>
  );
}
