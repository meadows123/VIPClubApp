import React from 'react';
import mapboxgl from 'mapbox-gl';

export default function MapTest() {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mapbox Token Test</h2>
      <div className="bg-gray-100 p-4 rounded">
        <p>Token exists: {token ? 'Yes' : 'No'}</p>
        <p>Token starts with 'pk.': {token?.startsWith('pk.') ? 'Yes' : 'No'}</p>
        <p>Token length: {token?.length || 0}</p>
        <p>First 10 characters: {token?.substring(0, 10)}...</p>
      </div>
    </div>
  );
} 