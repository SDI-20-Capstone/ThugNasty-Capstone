import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';





const SummaryGraph = ({ complete, total }) => {
  let remaining = total - complete
  if (remaining < 0){
    remaining = 0
  }
  const data = [
    { id: 0, value: complete, label: 'Complete', color: "#00C7CA"},
    { id: 1, value: remaining, label: 'Incomplete', color: "#DB5308" },
  ];

  return (
    <PieChart
    series={[
        {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
    ]}
    height={400}
    fullwidth
    padding
    />
  )
}

export default SummaryGraph
