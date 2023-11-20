import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';
import { useState, } from "react";
import { useNavigate } from "react-router-dom";

export default function AddObj() {
  const [openAdd, setOpenAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [missionImpact, setMissionImpact] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setTitle("");
    setMissionImpact("");
  };

  const handleSubmit = async () => {
    let jsonData = {
      title: title,
      missionImpact: missionImpact
    };

    try {
      const response = await fetch('http://localhost:8081/objectives', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (response.status === 200) {
        setTitle("");
        setMissionImpact("");
        navigate("/Personal"); 
        alert("Information added successfully");
      } else {
        alert("Information not added");
        setTitle("");
        setMissionImpact("");
      }
    } catch (error) {
      console.error('Error during fetch:', error);

    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === 'objective') {
      setTitle(value);
    } else if (id === 'missionImpact') {
      setMissionImpact(value);
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        <AddIcon /> Add Organization Objective
      </Button>
      <Dialog
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Organization Objective</DialogTitle>
        <DialogContent>
          <DialogContentText>Organization: Org will be here</DialogContentText>
        </DialogContent>
        Objective
        <TextField
          autoFocus
          margin="dense"
          id="objective"
          label=""
          fullWidth
          variant="outlined"
          value={title}
          onChange={handleChange}
        />
        Mission Impact
        <TextField
          autoFocus
          margin="dense"
          id="missionImpact"
          label=""
          fullWidth
          variant="outlined"
          value={missionImpact}
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
}
