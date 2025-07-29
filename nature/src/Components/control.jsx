import React from 'react';
import { useSorting } from '../Contexts/SortingContext';

export default function Controls() {
  const { 
    arrayState, 
    generateNewArray,
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    speed,        // Add this
    setSpeed,     // Add this
    arraySize,
    setArraySize
  } = useSorting();

  const algorithms = [
    { name: 'Bubble Sort', fn: bubbleSort, color: 'blue' },
    { name: 'Selection Sort', fn: selectionSort, color: 'purple' },
    { name: 'Insertion Sort', fn: insertionSort, color: 'pink' },
    { name: 'Merge Sort', fn: mergeSort, color: 'orange' },
    { name: 'Quick Sort', fn: quickSort, color: 'teal' }
  ];

  const handleGenerateArray = () => {
    if (!arrayState.sorting) {
      generateNewArray();
    }
  };

  const handleSort = async (sortFunction) => {
    if (!arrayState.sorting) {
      await sortFunction();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleGenerateArray}
          disabled={arrayState.sorting}
          className={`
            py-4 px-6 rounded-lg text-lg font-bold text-white
            ${arrayState.sorting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 active:bg-green-700'}
            transition-all duration-200 min-w-[200px]
          `}
        >
          Generate New Array
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white">Size:</span>
            <input
              type="range"
              min="5"
              max="25"
              value={arraySize}
              onChange={(e) => !arrayState.sorting && setArraySize(Number(e.target.value))}
              disabled={arrayState.sorting}
              className="w-32"
            />
            <span className="text-white w-8">{arraySize}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white">Speed:</span>
            <input
              type="range"
              min="1"
              max="5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={arrayState.sorting}
              className="w-32"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {algorithms.map(({ name, fn, color }) => (
          <button
            key={name}
            onClick={() => handleSort(fn)}
            disabled={arrayState.sorting}
            className={`
              py-4 px-6 rounded-lg text-lg font-bold text-white
              ${arrayState.sorting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : `bg-${color}-500 hover:bg-${color}-600 active:bg-${color}-700`}
              transition-all duration-200
            `}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}