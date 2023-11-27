import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from "../UserContext";

const PersonalOkr = () => {
  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [measurementValue, setMeasurementValue] = useState('');
  const [successOrFail, setSuccessOrFail] = useState('');
  const [addDialog, setAddDialog] = useState(false);
  const [personalOkr, setPersonalOkr] = useState([{}]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8081/personal_objectives")
      .then((res) => res.json())
      .then((data) => data.filter((entry) => entry.id === user.organization_id))
      .then((filteredData) => setPersonalOkr(filteredData));
  }, [user]);

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
      {personalOkr.map((row, index) => (
        <Accordion key={row.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{row.objective}</Typography>
          </AccordionSummary>
          <AccordionDetails 
          style={{ 
            display: 'flex', 
            flexDirection: 'row',
             justifyContent: 'space-between',
              alignItems: 'center' }}
              >
            <div>
              <Typography>
                {/* {`${row.title}: This is Key Result `} */}
              </Typography>
            </div>
            <div>
             
               <Typography>{row.impact} </Typography>
            </div>
            <div style={{ display: 'flex',
             flexDirection: 'row', 
             justifyContent: 'space-between',
             alignItems: 'center' }}
              >
              <IconButton onClick={handleAddMeasurement} color="primary" aria-label="add measurement">
                <AddIcon />
              </IconButton>
              <Typography>{`${row.success_count}/${row.target_value}`}</Typography>
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
            <CircularWithValueLabel 
            successCount={row.success_count}
            targetValue={row.target_value}
            
            />
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
