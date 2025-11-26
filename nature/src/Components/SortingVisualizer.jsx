import React from 'react';
import { useSorting } from '../Contexts/SortingContext.jsx';
import Controls from './control.jsx';

export default function SortingVisualizer() {
  const { arrayState } = useSorting();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Controls />
        
        <div className="array-container h-[70vh] flex items-end justify-center mt-8 bg-gray-800 rounded-lg p-8">
          {arrayState.array.map((value, idx) => (
            <div
              key={`bar-${idx}`}
              className="array-bar"
              style={{
                height: `${(value/300)*100}%`,
                width: `${Math.max(30, Math.min(60 / arrayState.array.length, 60))}px`,
                backgroundColor: arrayState.comparing.includes(idx)
                  ? '#FFEB3B'// yellow color
                  : arrayState.swapping.includes(idx)
                  ? '#FF4444'//red
                  : '#3B82F6',// blue
                margin: '0 2px',
                borderRadius: '2px 2px 0 0'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}