// app/posyandu/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import TabNavigation from '@/components/TabNavigation';
import VisitHistoryCard from '@/components/VisitHistoryCard';
import { tabs } from '@/components/TabConstant';

export default function PosyanduDetail() {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showNewVisitCard, setShowNewVisitCard] = useState(false);
  const [newVisit, setNewVisit] = useState({
    date: '',
    weight: '',
    height: '',
    armCircumference: '',
    headCircumference: '',
  });

  const params = useParams();

  // const tabs = [
  //   {
  //     name: 'Home',
  //     route: '/home',
  //     icon: 'M3.75 12l8.25-8.25L20.25 12v6a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V12z',
  //   },
  //   {
  //     name: 'Posyandu',
  //     route: '/posyandu?rt=&age=',
  //     icon: 'M12 4.5v15m-7.5-7.5h15',
  //   },
  //   {
  //     name: 'Posbindu',
  //     route: '/posbindu',
  //     icon: 'M12 2a9 9 0 100 18 9 9 0 000-18z',
  //   },
  // ];

  const fetchResident = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posyandu/${params.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch resident');
      }

      const data = await response.json();
      // console.log('Resident data:', data);  // Debug log
      setResident(data);
    } catch (error) {
      console.error('Error fetching resident:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNewVisit = async () => {
    try {
      console.log('Saving new visit:', newVisit); // Debug log
      const response = await fetch(`/api/posyandu/${params.id}/new-visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVisit),
      });

      if (!response.ok) {
        throw new Error("Failed to save new visit");
      }

      setShowNewVisitCard(false);
      setNewVisit({ date: '', weight: '', height: '', armCircumference: '', headCircumference: '' });
      fetchResident(); // Refresh data
    } catch (error) {
      setError('Error saving new visit: ' + error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchResident();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-600">
          <p>Error loading resident data: {error}</p>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Data tidak ditemukan</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-yellow-400 p-6 rounded-b-3xl shadow-md">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">{resident.name}</h1>
              <p className="text-amber-900">{resident.age}</p>
              <p className="text-amber-900">{resident.gender}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Current Measurements */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-amber-900">Pengukuran Terkini</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-sm text-amber-900">Berat Badan</p>
              <p className="text-xl font-semibold text-amber-900">{resident.growthData.weight} kg</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-sm text-amber-900">Tinggi Badan</p>
              <p className="text-xl font-semibold text-amber-900">{resident.growthData.height} cm</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-sm text-amber-900">Lingkar Lengan</p>
              <p className="text-xl font-semibold text-amber-900">{resident.growthData.armCircumference} cm</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-sm text-amber-900">Lingkar Kepala</p>
              <p className="text-xl font-semibold text-amber-900">{resident.growthData.headCircumference} cm</p>
            </div>
          </div>
        </div>

        {/* Growth Charts */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-amber-900">Grafik Pertumbuhan</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={resident.growthData.visitHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('id-ID')}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString('id-ID')}
                  formatter={(value) => `${value} cm`}
                />
                <Legend />
                <Line type="monotone" dataKey="weight" name="Berat (kg)" stroke="#F59E0B" />
                <Line type="monotone" dataKey="height" name="Tinggi (cm)" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visit History */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold mb-4 text-amber-900">Riwayat Kunjungan</h2>
            <button onClick={() => setShowNewVisitCard(true)} className="text-amber-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Mobile View: New Card UI */}
          {showNewVisitCard && (
            <div className="bg-orange-100 p-6 rounded-lg mb-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="date"
                  className="p-2 rounded border"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({ ...newVisit, date: e.target.value })}
                />
                <input
                  type="number"
                  className="p-2 rounded border"
                  placeholder="BB (kg)"
                  value={newVisit.weight}
                  onChange={(e) => setNewVisit({ ...newVisit, weight: e.target.value })}
                />
                <input
                  type="number"
                  className="p-2 rounded border"
                  placeholder="TB (cm)"
                  value={newVisit.height}
                  onChange={(e) => setNewVisit({ ...newVisit, height: e.target.value })}
                />
                <input
                  type="number"
                  className="p-2 rounded border"
                  placeholder="LiLa (cm)"
                  value={newVisit.armCircumference}
                  onChange={(e) => setNewVisit({ ...newVisit, armCircumference: e.target.value })}
                />
                <input
                  type="number"
                  className="p-2 rounded border"
                  placeholder="LiKa (cm)"
                  value={newVisit.headCircumference}
                  onChange={(e) => setNewVisit({ ...newVisit, headCircumference: e.target.value })}
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button onClick={handleSaveNewVisit} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
                <button
                  onClick={() => {
                    setShowNewVisitCard(false);
                    setNewVisit({ date: '', weight: '', height: '', armCircumference: '', headCircumference: '' });
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
        )}

          {/* Mobile View: Card List UI */}
          <div className="block md:hidden">
            {resident.growthData.visitHistory
              .slice() // Create a shallow copy to avoid modifying the original array
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort the copied array
              .map((visit, index) => (
              <VisitHistoryCard
                key={index}
                visit={visit}
                residentId={params.id}
                onUpdateSuccess={fetchResident} // Refresh data on successful update
              />
            ))}
          </div>

          {/* Desktop View: Table UI */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-orange-100">
                  <th className="px-4 py-2 text-left text-amber-900">Tanggal</th>
                  <th className="px-4 py-2 text-left text-amber-900">BB (kg)</th>
                  <th className="px-4 py-2 text-left text-amber-900">TB (cm)</th>
                  <th className="px-4 py-2 text-left text-amber-900">LiLa (cm)</th>
                  <th className="px-4 py-2 text-left text-amber-900">LiKa (cm)</th>
                </tr>
              </thead>
              <tbody>
                {resident.growthData.visitHistory
                  .slice() // Create a shallow copy to avoid modifying the original array
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort the copied array
                  .map((visit, index) => (
                    <tr key={index} className="border-b hover:bg-orange-50">
                      <td className="px-4 py-2">{new Date(visit.date).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-2">{visit.weight}</td>
                      <td className="px-4 py-2">{visit.height}</td>
                      <td className="px-4 py-2">{visit.armCircumference}</td>
                      <td className="px-4 py-2">{visit.headCircumference}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} />
    </div>
  );
}