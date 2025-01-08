'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DatePicker from "react-datepicker"; // Install with `npm install react-datepicker`
import "react-datepicker/dist/react-datepicker.css";

export default function PosyanduDetail() {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchResident = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/posyandu/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch resident');
        const data = await response.json();
        setResident(data);
      } catch (error) {
        console.error('Error fetching resident:', error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchResident();
  }, [params.id]);

  const handleEdit = () => {
    setEditMode(true);
    setEditableData(resident.growthData.visitHistory); // Deep copy if needed
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/posyandu/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ growthData: editableData }),
      });
      if (!response.ok) throw new Error('Failed to save data');
      const updatedResident = await response.json();
      setResident(updatedResident);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;
    setEditableData(updatedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!resident) return <div>Data not found</div>;

  return (
    <div>
      <h1>{resident.name}</h1>
      <div>
        {editableData.map((visit, index) => (
          <div key={index} className="mb-4">
            <DatePicker
              selected={new Date(visit.date)}
              onChange={(date) =>
                handleInputChange(index, "date", date.toISOString())
              }
              disabled={!editMode}
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={visit.weight}
              onChange={(e) =>
                handleInputChange(index, "weight", parseFloat(e.target.value))
              }
              disabled={!editMode}
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={visit.height}
              onChange={(e) =>
                handleInputChange(index, "height", parseFloat(e.target.value))
              }
              disabled={!editMode}
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={visit.armCircumference}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "armCircumference",
                  parseFloat(e.target.value)
                )
              }
              disabled={!editMode}
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={visit.headCircumference}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "headCircumference",
                  parseFloat(e.target.value)
                )
              }
              disabled={!editMode}
              className="border p-2 rounded"
            />
          </div>
        ))}
      </div>
      <button
        onClick={editMode ? handleSave : handleEdit}
        className="text-sm font-semibold bg-yellow-400 text-amber-900 py-2 px-4 rounded-md hover:bg-yellow-500"
      >
        {editMode ? "Save" : "Edit"}
      </button>
    </div>
  );
}
