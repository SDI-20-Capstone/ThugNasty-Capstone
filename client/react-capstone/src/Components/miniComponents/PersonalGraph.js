import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const PersonalGraph = ({ success, fail }) => {
  const data = [
    { id: 0, category: 'Success', value: success, color: '#02F311' },
    { id: 1, category: 'Failure', value: fail, color: 'red' },
  ];

  return (
    <BarChart
      data={data}
      x="category"
      y="value"
      color="color"
      height={150}
    />
  );
}

export default PersonalGraph;