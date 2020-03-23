import React from 'react';

export const Grid = ({ grid }) => {
  return grid.map(element => <li key={element.length}>{element}</li>);
};
