'use client';

export default function SearchCard({ resident, onDetailClick }) {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{resident.name}</h3>
        <p className="text-sm text-gray-500">{resident.age}</p>
        <p className="text-sm text-yellow-500">{resident.gender}</p>
      </div>
      <div>
        <button 
          className="text-sm bg-yellow-400 text-amber-900 py-2 px-4 rounded-md hover:bg-yellow-500"
          onClick={() => {
            // console.log('Detail button clicked for resident:', resident.id);
            onDetailClick();
          }}
        >
          Detail
        </button>
      </div>
    </div>
  )
}
  