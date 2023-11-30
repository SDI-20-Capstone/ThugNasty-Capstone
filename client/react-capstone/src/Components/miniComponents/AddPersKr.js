import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../UserContext';
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Toggle from './Toggle';

const AddPersKr = ({ objTitle, krAdded, setKrAdded }) => {
  const [open, setOpen] = useState(false);
  const [newKrTitle, setNewKrTitle] = useState();
  const [newTargetValue, setNewTargetValue] = useState();
  const [toggled, setToggled] = useState(false);
  const { user } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleSubmit = async () => {
    let jsonData = {
      newKrTitle: newKrTitle,
      title: objTitle,
      newStartDate: dateValue[0].format('YYYY-MM-DD'),
      newEndDate: dateValue[1].format('YYYY-MM-DD'),
      newTargetValue: newTargetValue,
      newSuccessCount: 0,
      newFailCount: 0,
    };
    console.log(jsonData)

     const response = await fetch('http://localhost:8081/personal_key_results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(jsonData),
      });

      if (response.status === 201) {
        setNewKrTitle("");
        setNewTargetValue("");
        setKrAdded(!krAdded);
        handleClose();
        alert("New Kr Details added");
      } else {
        alert("New Kr has not been added");
        setNewKrTitle("");
        setNewTargetValue("");
      }

    setOpen(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === 'key_results') {
      setNewKrTitle(value);
    } else if (id === 'newKrTitle') {
      setNewKrTitle(value);
    }
  };

  const [dateValue, setDateValue] = React.useState([
    dayjs('2023-11-27'),
    dayjs('2023-11-28'),
  ]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Add KR
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Key Result</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User: {user.first_name}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Title'
            type='Title'
            fullWidth
            value={newKrTitle}
            onChange={(e) => setNewKrTitle(e.target.value)}
          />
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                <DemoItem  component="DateRangePicker">
                  <DateRangePicker
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              target_percent  <Toggle onClick={handleToggle}/> target_value
            </div>
          </div>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Percent Input'
            type='number'
            fullWidth
          />
          Or
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Value Input'
            type='number'
            fullWidth
            value={newTargetValue}
            onChange={(e) => setNewTargetValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddPersKr;