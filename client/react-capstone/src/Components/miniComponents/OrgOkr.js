import React, { useState } from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  MenuItem,
  Select
} from "@mui/material";
import {  useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularWithValueLabel from './CircularWithValueLabel';
import AddKr from './AddKr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const OrgOkr = () => {
  const [orgOkr, setOrgOkr] = useState([{}]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:8081/objectives')
    .then(res => res.json())
    .then(data => data.filter(entry => entry.id === user.organization_id))
    .then(filteredData => setOrgOkr(filteredData))
  }, [user])

  const Objective1 = { name: 'Objective1', value: 'KR1' };
  const Objective2 = { name: 'Objective2', value: 'KR2' };
  const Objective3 = { name: 'Objective3', value: 'KR3' };
  const unionArray = [Objective1, Objective2, Objective3];

  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [measurementValue, setMeasurementValue] = useState('');

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const [addDialog, setAddDialog] = useState(false);

   const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue('');
   };

   const handleAddDialogSubmit = () => {
    const measurement = parseFloat(measurementValue);
    if(!isNaN(measurement)) {
        setMeasurementCount(measurementCount + measurement);
        setSuccessCount(successCount + (measurement > 0 ? 1 : 0));
    }

    setAddDialog(false);
    setMeasurementValue('');
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
              <Typography>{`${measurementCount.toFixed(2)}/${successCount}`}</Typography>
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
    onChange={''}
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
            <AddKr/>

            </div>
          </AccordionDetails>
        </Accordion>


      ))}
    </Paper>
  );
}

export default OrgOkr;
