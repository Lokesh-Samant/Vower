import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
const BackIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PlugIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const RangeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

// Mock Data
const vehicles = [
  {
    id: 1,
    name: 'Tata Nexon EV',
    manufacturer: 'Tata Motors',
    model: 'EV Max',
    year: 2023,
    battery: '40.5 kWh',
    connector: 'CCS2',
    range: '465 km',
    registration: 'MH 12 AB 1234',
    color: 'Glacier White',
    isDefault: true,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'MG ZS EV',
    manufacturer: 'MG Motor',
    model: 'ZS EV',
    year: 2022,
    battery: '50.3 kWh',
    connector: 'CCS2',
    range: '419 km',
    registration: 'DL 01 CD 5678',
    color: 'Red',
    isDefault: false,
    image: 'https://images.unsplash.com/photo-1565514020176-db793d8e1f8c?w=400&h=300&fit=crop'
  }
];

export default function MyVehicle() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [vehicleList, setVehicleList] = useState(vehicles);

  const handleSetDefault = (id) => {
    setVehicleList(vehicleList.map(v => ({
      ...v,
      isDefault: v.id === id
    })));
  };

  const handleDelete = (id) => {
    setVehicleList(vehicleList.filter(v => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-xl font-bold text-[#111111]">My Vehicle</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors active:scale-95"
          >
            <PlusIcon />
          </button>
        </div>
      </header>

      <main className="px-4 max-w-lg mx-auto pt-6">
        {vehicleList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-fade-in">
            <CarIcon />
            <h3 className="mt-6 text-lg font-semibold text-[#111111]">No Vehicle Added</h3>
            <p className="mt-2 text-sm text-gray-500">Add your first electric vehicle to get started.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-6 px-8 py-3 bg-[#111111] text-white font-semibold rounded-full active:scale-95 transition-transform"
            >
              Add Your First EV
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {vehicleList.map((vehicle, index) => (
              <div 
                key={vehicle.id} 
                className="bg-white border border-[#EAEAEA] rounded-[18px] overflow-hidden shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-40 bg-gray-100 relative">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                  {vehicle.isDefault && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <CheckIcon /> Default
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-[#111111]">{vehicle.name}</h3>
                      <p className="text-sm text-gray-500">{vehicle.manufacturer} • {vehicle.year}</p>
                    </div>
                    {!vehicle.isDefault && (
                      <button 
                        onClick={() => handleSetDefault(vehicle.id)}
                        className="text-xs px-3 py-1 bg-gray-100 text-black font-semibold rounded-full active:scale-95 transition-transform"
                      >
                        Set Default
                      </button>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="flex justify-center mb-1 text-gray-400"><BoltIcon /></div>
                      <p className="text-xs text-gray-400">Battery</p>
                      <p className="text-sm font-semibold">{vehicle.battery}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="flex justify-center mb-1 text-gray-400"><PlugIcon /></div>
                      <p className="text-xs text-gray-400">Connector</p>
                      <p className="text-sm font-semibold">{vehicle.connector}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="flex justify-center mb-1 text-gray-400"><RangeIcon /></div>
                      <p className="text-xs text-gray-400">Range</p>
                      <p className="text-sm font-semibold">{vehicle.range}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>Reg: {vehicle.registration}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{vehicle.color}</span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 py-3 flex items-center justify-center gap-2 bg-gray-100 text-black font-semibold rounded-xl active:scale-95 transition-transform">
                      <EditIcon /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      className="flex-1 py-3 flex items-center justify-center gap-2 bg-red-50 text-red-500 font-semibold rounded-xl active:scale-95 transition-transform"
                    >
                      <TrashIcon /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Vehicle Modal - Simplified */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add Vehicle</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                <input type="text" placeholder="e.g., Tata Nexon EV" className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                  <input type="text" placeholder="Brand" className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model Year</label>
                  <input type="number" placeholder="2024" className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <input type="text" placeholder="MH 12 AB 1234" className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Battery Capacity</label>
                  <input type="text" placeholder="kWh" className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Connector Type</label>
                  <select className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors">
                    <option>CCS2</option>
                    <option>Type 2</option>
                    <option>CHAdeMO</option>
                    <option>GB/T</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input type="text" placeholder="Vehicle Color" className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <label className="flex items-center gap-3 p-4 border border-[#EAEAEA] rounded-xl cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded accent-black" />
                <span className="text-sm font-medium">Set as Default Vehicle</span>
              </label>

              <button type="submit" className="w-full py-4 bg-[#111111] text-white font-semibold rounded-xl active:scale-95 transition-transform">
                Save Vehicle
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
