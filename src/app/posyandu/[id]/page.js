// app/posyandu/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PosyanduDetail() {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchResident = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching resident with ID:', params.id); // Debug log
        const response = await fetch(`/api/posyandu/${params.id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch resident');
        }

        const data = await response.json();
        console.log('Fetched resident data:', data); // Debug log
        setResident(data);
      } catch (error) {
        console.error('Error fetching resident:', error);
      } finally {
        setLoading(false);
      }
    };

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
              <p className="text-amber-900">{resident.phoneNumber}</p>
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" name="Berat (kg)" stroke="#F59E0B" />
                <Line type="monotone" dataKey="height" name="Tinggi (cm)" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visit History */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-amber-900">Riwayat Kunjungan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-orange-100">
                  <th className="px-4 py-2 text-left text-amber-900">Tanggal</th>
                  <th className="px-4 py-2 text-left text-amber-900">BB (kg)</th>
                  <th className="px-4 py-2 text-left text-amber-900">TB (cm)</th>
                  <th className="px-4 py-2 text-left text-amber-900">LiLA (cm)</th>
                  <th className="px-4 py-2 text-left text-amber-900">LiKa (cm)</th>
                </tr>
              </thead>
              <tbody>
                {resident.growthData.visitHistory.map((visit, index) => (
                  <tr key={index} className="border-b hover:bg-orange-50">
                    <td className="px-4 py-2">{visit.date}</td>
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
    </div>
  );
}