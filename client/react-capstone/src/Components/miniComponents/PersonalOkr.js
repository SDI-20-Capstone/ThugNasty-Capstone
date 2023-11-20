import React, { useState } from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularWithValueLabel from './CircularWithValueLabel';
import AddKr from './AddKr';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddPersObj from './AddPersObj';


const PersonalOkr = () => {
  const personal1 = { name: 'personal1', value: 'KR1' };
  const personal2 = { name: 'personal2', value: 'KR2' };
  const personal3 = { name: 'personal3', value: 'KR3' };
  const unionArray = [personal1, personal2, personal3];

  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [measurementValue, setMeasurementValue] = useState('');
  const [successOrFail, setSuccessOrFail] = useState('');
  const [addDialog, setAddDialog] = useState(false);

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue('');
    setSuccessOrFail('');
  };

  const handleAddDialogSubmit = () => {
    const measurement = parseFloat(measurementValue);
    if (!isNaN(measurement)) {
      setMeasurementCount(measurementCount + measurement);
      setSuccessCount(successCount + (measurement > 0 ? 1 : 0));
    }

    setAddDialog(false);
    setMeasurementValue('');
    setSuccessOrFail('');
  };

  return (

    
    
    <Paper>
        <AddPersObj/>
      {unionArray.map((row, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{row.name}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Typography>
                {`${row.value}: This is Key Result `}
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton onClick={handleAddMeasurement} color="primary" aria-label="add measurement">
                <AddIcon />
              </IconButton>
              <Typography>{`${measurementCount}/${successCount}`}</Typography>
              <Dialog open={addDialog} onClose={handleAddDialogClose}>
                <DialogTitle>Organization: Org here</DialogTitle>
                <DialogContent>
Number of Measurements
          <TextField
            label="Number Input"
            variant="outlined"
            value={measurementValue}
            onChange={(e) => setMeasurementValue(e.target.value)}
            type="number"
            autoFocus
            margin="dense"
            fullWidth
          />
   Success or Fail
    <Select
    value=''
    onChange={(e) => setSuccessOrFail(e.target.value)}
    fullWidth
    autoFocus
    margin='dense'
    variant='outlined'
    label=''
    > 
    <MenuItem value={10}> Success</MenuItem>
    <MenuItem value={10}> Failure</MenuItem>

        </Select>
        
        
          
Notes
<TextField
            label=""
            variant="filled"
            type="text"
            multiline
            fullWidth
            rows={8}
            autoFocus
            margin="dense"
          />
          

        </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddDialogClose}>Cancel</Button>
                  <Button onClick={handleAddDialogSubmit} color="primary">Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
            <CircularWithValueLabel />
            <div>
              <AddKr />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default PersonalOkr;
