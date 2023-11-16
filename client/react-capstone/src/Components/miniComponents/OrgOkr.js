import React, { useState } from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import {  useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularWithValueLabel from './CircularWithValueLabel';
import AddKr from './AddKr';

const OrgOkr = () => {
  const [orgOkr, setOrgOkr] = useState([{}]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:8081/objectives')
    .then(res => res.json())
    .then(data => data.filter(entry => entry.id === user.organization_id))
    .then(filteredData => setOrgOkr(filteredData))
  }, [user])

  console.log(orgOkr)
  const Objective1 = { name: 'Objective1', value: 'KR1' };
  const Objective2 = { name: 'Objective2', value: 'KR2' };
  const Objective3 = { name: 'Objective3', value: 'KR3' };
  const unionArray = [Objective1, Objective2, Objective3];

  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  const handleAddMeasurement = () => {
    setMeasurementCount(measurementCount + 1);
  };
  

  return (
    <Paper>
      {unionArray.map((row, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${row.name}-content`}
            id={`panel-${row.name}-header`}
          >
            <Typography>{row.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography>
                {row.value}: This is Key Result {row.value}
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton onClick={handleAddMeasurement} color="primary" aria-label="add measurement">
                <AddIcon />
              </IconButton>
              <Typography>{`${measurementCount}/${successCount}`}</Typography>
            </div>
            <CircularWithValueLabel />
            <div>
            <AddKr/>

            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

export default OrgOkr;
