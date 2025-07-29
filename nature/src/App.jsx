import React from 'react';
import { SortingProvider } from './Contexts/SortingContext.jsx';
import SortingVisualizer from './Components/SortingVisualizer.jsx';

function App() {
  return (
    <SortingProvider>
      <SortingVisualizer />
    </SortingProvider>
  );
}

export default App;
