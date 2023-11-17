import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CircularWithValueLabel from './CircularWithValueLabel';
import AddKr from './AddKr';

const PersonalOkr = () => {
  const personal1 = { name: 'personal1', value: 'KR1' };
  const personal2 = { name: 'personal2', value: 'KR1' };
  const personal3 = { name: 'personal3', value: 'KR1' };
  const unionArray = [personal1, personal2, personal3];

  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  const handleAddMeasurement = () => {
    setMeasurementCount(measurementCount + 1);
    
  };

  return (
    <div>
      {unionArray.map((row, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{row.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
            <Typography>
                KR1: This is key result 1
            </Typography>

            </div>
            <br/>
            <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton onClick={handleAddMeasurement} color="primary" aria-label="add measurement">
                <AddIcon
                
                />
              </IconButton>
              <Typography>{`${measurementCount}/${successCount}`}</Typography>
            </div>
            <CircularWithValueLabel/>
            <AddKr/>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PersonalOkr;







{/* This will go after 47 <TableCell align="center">
                    <FormControl variant="outlined" className=''>
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Keys
                      </InputLabel>
                      <Select native label="Value">
                        <option aria-label="None" value="" />
                        <option>{row.value}</option>
                      </Select>
                    </FormControl>
                  </TableCell> */}

               