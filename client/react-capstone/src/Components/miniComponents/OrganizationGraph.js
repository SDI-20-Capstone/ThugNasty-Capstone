import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';





const OrganizationGraph = ({ success, fail, total }) => {
  let remaining = total - (success + fail)
  if (remaining < 0){
    remaining = 0
  }
  const data = [
    { id: 0, value: success, label: 'Success', color: "#02F311"},
    { id: 1, value: fail, label: 'Failure', color: "red" },
    { id: 2, value: remaining, label: 'Incomplete', color: "gray" },
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
    height={150}
    />
  )
}

export default OrganizationGraph
