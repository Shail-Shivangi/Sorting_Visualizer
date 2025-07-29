import React, { createContext, useState, useContext } from 'react';

const SortingContext = createContext();

// Move useSorting hook before it's used
export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) throw new Error('useSorting must be used within SortingProvider');
  return context;
};

export const SortingProvider = ({ children }) => {
  const [arrayState, setArrayState] = useState({
    array: [],
    sorting: false,
    comparing: [],
    swapping: []
  });
  const [speed, setSpeed] = useState(1);
  const [arraySize, setArraySize] = useState(10);

  const generateNewArray = () => {
    const newArray = Array.from(
      { length: arraySize }, 
      () => Math.floor(Math.random() * 300) + 10
    );
    setArrayState({
      array: newArray,
      sorting: false,
      comparing: [],
      swapping: []
    });
  };

  // Initialize array when component mounts
  React.useEffect(() => {
    generateNewArray();
  }, []);

  const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms / speed));

  const bubbleSort = async () => {
    const arr = [...arrayState.array];
    setArrayState(prev => ({ ...prev, sorting: true }));

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setArrayState(prev => ({
          ...prev,
          comparing: [j, j + 1],
          swapping: []
        }));
        await sleep();

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArrayState(prev => ({
            ...prev,
            array: [...arr],
            comparing: [],
            swapping: [j, j + 1]
          }));
          await sleep();
        }
      }
    }
    setArrayState(prev => ({
      ...prev,
      sorting: false,
      comparing: [],
      swapping: []
    }));
  };

  const selectionSort = async () => {
    const arr = [...arrayState.array];
    setArrayState(prev => ({ ...prev, sorting: true }));

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        setArrayState(prev => ({
          ...prev,
          comparing: [minIdx, j],
          swapping: []
        }));
        await sleep();

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArrayState(prev => ({
          ...prev,
          array: [...arr],
          comparing: [],
          swapping: [i, minIdx]
        }));
        await sleep();
      }
    }
    setArrayState(prev => ({
      ...prev,
      sorting: false,
      comparing: [],
      swapping: []
    }));
  };

  const insertionSort = async () => {
    const arr = [...arrayState.array];
    setArrayState(prev => ({ ...prev, sorting: true }));

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key) {
        setArrayState(prev => ({
          ...prev,
          comparing: [j, j + 1],
          swapping: []
        }));
        await sleep();

        arr[j + 1] = arr[j];
        setArrayState(prev => ({
          ...prev,
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1]
        }));
        await sleep();
        j--;
      }
      arr[j + 1] = key;
      setArrayState(prev => ({
        ...prev,
        array: [...arr]
      }));
    }
    setArrayState(prev => ({
      ...prev,
      sorting: false,
      comparing: [],
      swapping: []
    }));
  };

  const quickSort = async () => {
    const arr = [...arrayState.array];
    setArrayState(prev => ({ ...prev, sorting: true }));

    const partition = async (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setArrayState(prev => ({
          ...prev,
          comparing: [j, high],
          swapping: []
        }));
        await sleep();

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArrayState(prev => ({
            ...prev,
            array: [...arr],
            comparing: [],
            swapping: [i, j]
          }));
          await sleep();
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArrayState(prev => ({
        ...prev,
        array: [...arr],
        comparing: [],
        swapping: [i + 1, high]
      }));
      await sleep();
      return i + 1;
    };

    const quickSortHelper = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    setArrayState(prev => ({
      ...prev,
      sorting: false,
      comparing: [],
      swapping: []
    }));
  };

  const mergeSort = async () => {
    const arr = [...arrayState.array];
    setArrayState(prev => ({ ...prev, sorting: true }));

    const merge = async (start, mid, end) => {
      const temp = [];
      let i = start, j = mid + 1;

      while (i <= mid && j <= end) {
        setArrayState(prev => ({
          ...prev,
          comparing: [i, j],
          swapping: []
        }));
        await sleep();

        if (arr[i] <= arr[j]) {
          temp.push(arr[i++]);
        } else {
          temp.push(arr[j++]);
        }
      }

      while (i <= mid) temp.push(arr[i++]);
      while (j <= end) temp.push(arr[j++]);

      for (let k = 0; k < temp.length; k++) {
        arr[start + k] = temp[k];
        setArrayState(prev => ({
          ...prev,
          array: [...arr],
          comparing: [],
          swapping: [start + k]
        }));
        await sleep();
      }
    };

    const mergeSortHelper = async (start, end) => {
      if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        await merge(start, mid, end);
      }
    };

    await mergeSortHelper(0, arr.length - 1);
    setArrayState(prev => ({
      ...prev,
      sorting: false,
      comparing: [],
      swapping: []
    }));
  };

  return (
    <SortingContext.Provider value={{
      arrayState,
      setArrayState,
      speed,
      setSpeed,
      arraySize,
      setArraySize,
      generateNewArray,
      bubbleSort,
      selectionSort,
      insertionSort,
      mergeSort,
      quickSort
    }}>
      {children}
    </SortingContext.Provider>
  );
};