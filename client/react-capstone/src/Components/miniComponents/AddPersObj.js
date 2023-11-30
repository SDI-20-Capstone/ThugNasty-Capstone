import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const AddPersObj = ({ objAdded, setObjAdded }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  const [newImpact, setNewImpact] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const { user } = useContext(UserContext);

  const handleOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setNewObjective('');
    setNewImpact('');
  };

  const handleSubmit = async () => {
    let jsonData = {
      objective: newObjective,
      impact: newImpact,
      user_id: user.id,
    };

    try {
      const response = await fetch('http://localhost:8081/personal_objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (response.status === 201) {
        alert('Information added successfully');
        setObjAdded(!objAdded);
        handleClose();
        setNewObjective('');
        setNewImpact('');
        // navigate("/Home");
      } else {
        alert('Information not added');
        setNewObjective('');
        setNewImpact('');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === 'newObjective') {
      setNewObjective(value);
    } else if (id === 'newImpact') {
      setNewImpact(value);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        <AddIcon /> Add Personal Objective
      </Button>
      <Dialog open={openAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Personal Objective</DialogTitle>
        <DialogContent>
          <DialogContentText>User: {user.first_name}</DialogContentText>
        </DialogContent>
        Objective
        <TextField
          autoFocus
          margin="dense"
          id="newObjective"
          label="New Objective Title"
          fullWidth
          variant="outlined"
          value={newObjective}
          onChange={handleChange}
        />
        Impact
        <TextField
          autoFocus
          margin="dense"
          id="newImpact"
          label="New Mission Impact"
          fullWidth
          variant="outlined"
          value={newImpact}
          onChange={handleChange}
        />
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
};

export default AddPersObj;