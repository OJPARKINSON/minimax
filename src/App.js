import React, { useState } from 'react';
import Grid from 'components/Grid';
import './App.css';

function App() {
  const [grid, setGrid] = useState(Array(9));
  return (
    <React.Fragment>
      <Grid />
    </React.Fragment>
  );
}

export default App;
