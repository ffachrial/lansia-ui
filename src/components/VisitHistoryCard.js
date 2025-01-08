"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VisitHistoryCard({ visit, residentId, onUpdateSuccess }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedVisit, setEditedVisit] = useState(visit);
  const [error, setError] = useState("");
  
  const handleInputChange = (field, value) => {
    if (field === "date" && value instanceof Date) {
        setEditedVisit((prev) => ({
          ...prev,
          [field]: value.toISOString(),
        }));
    } else {
        setEditedVisit((prev) => ({
          ...prev,
          [field]: parseFloat(value) || null, // Ensure numeric fields are parsed correctly
        }));
    }
  };

  const formatNumber = (value, format) => {
    if (typeof value !== "number" || isNaN(value)) {
        return "N/A"; // Return a fallback value for invalid inputs
    }

    return format === "00.0"
      ? value.toFixed(1).padStart(4, "0")
      : value.toFixed(1).padStart(5, "0");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      
      // Transform the data to match the MongoDB structure
      const updatedVisitData = {
        visit_date: editedVisit.date,
        tinggi_badan: editedVisit.height,
        berat_badan: editedVisit.weight,
        lingkar_kepala: editedVisit.headCircumference,
        lingkar_lengan: editedVisit.armCircumference,
        _id: visit.id // Include the visit history ID
      };

      // Debug log
      console.log("Sending data:", {
        residentId,
        updatedVisitData
      });

      const response = await fetch(`/api/posyandu/${residentId}/visit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVisitData),
      });

      if (!response.ok) {
        throw new Error("Failed to update visit");
      }

      setIsEditing(false);
      onUpdateSuccess();
    } catch (err) {
      setError(err.message || "Failed to update visit");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex items-center bg-orange-100 p-4 rounded-lg mb-4">
      <div className="flex-grow ml-4 space-y-2">
        {isEditing ? (
          <>
            <div className="flex items-center">
              <span className="text-sm text-amber-900 w-20">Tanggal:</span>
              <DatePicker
                selected={new Date(editedVisit.date)}
                onChange={(date) => handleInputChange("date", date)}
                className="text-sm text-amber-900 bg-white border border-amber-300 rounded-md px-2 py-1 w-32"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-amber-900 w-20">BB (kg):</span>
              <input
                type="number"
                step="0.1"
                value={editedVisit.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className="text-sm text-amber-900 bg-white border border-amber-300 rounded-md px-2 py-1 w-24"
                placeholder="00.0"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-amber-900 w-20">TB (cm):</span>
              <input
                type="number"
                step="0.1"
                value={editedVisit.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="text-sm text-amber-900 bg-white border border-amber-300 rounded-md px-2 py-1 w-24"
                placeholder="000.0"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-amber-900 w-20">LiLa (cm):</span>
              <input
                type="number"
                step="0.1"
                value={editedVisit.armCircumference}
                onChange={(e) => handleInputChange("armCircumference", e.target.value)}
                className="text-sm text-amber-900 bg-white border border-amber-300 rounded-md px-2 py-1 w-24"
                placeholder="00.0"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-amber-900 w-20">LiKa (cm):</span>
              <input
                type="number"
                step="0.1"
                value={editedVisit.headCircumference}
                onChange={(e) => handleInputChange("headCircumference", e.target.value)}
                className="text-sm text-amber-900 bg-white border border-amber-300 rounded-md px-2 py-1 w-24"
                placeholder="00.0"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </>
        ) : (
          <>
            <p className="text-sm text-amber-900">
              Tanggal: {visit.date ? new Date(visit.date).toLocaleDateString("id-ID") : "N/A"}
            </p>
            <p className="text-sm text-amber-900">
              BB (kg): {visit.weight != null ? formatNumber(visit.weight, "00.0") : "N/A"}
            </p>
            <p className="text-sm text-amber-900">
              TB (cm): {visit.height != null ? formatNumber(visit.height, "000.0") : "N/A"}
            </p>
            <p className="text-sm text-amber-900">
              LiLa (cm): {visit.armCircumference != null ? formatNumber(visit.armCircumference, "00.0") : "N/A"}
            </p>
            <p className="text-sm text-amber-900">
              LiKa (cm): {visit.headCircumference != null ? formatNumber(visit.headCircumference, "00.0") : "N/A"}
            </p>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`text-sm font-semibold bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving
              </span>
            ) : (
              "Save"
            )}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-semibold bg-yellow-400 text-amber-900 py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
