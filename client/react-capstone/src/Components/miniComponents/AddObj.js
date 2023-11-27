import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function AddObj() {
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  const [newMissionImpact, setNewMissionImpact] = useState(''); 
  const [newObjectiveTitle, setNewObjectiveTitle] = useState(''); 
  const { user } = useContext(UserContext);
  const handleOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setNewObjectiveTitle("");
    setNewMissionImpact("");
  };

  const handleSubmit = async () => {
    let jsonData = {
      newMissionImpact: newMissionImpact,
      newObjectiveTitle: newObjectiveTitle,
      userid: user.id,
      organizationid: user.organization_id,
    };

    try {
      const response = await fetch('http://localhost:8081/objectives', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (response.status === 201) {
        setNewMissionImpact("");
        setNewObjectiveTitle("");
        navigate("/Home"); 
        alert("Information added successfully");
      } else {
        alert("Information not added");
       setNewMissionImpact("");
       setNewObjectiveTitle("");
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === 'objectives') {
    } else if (id === 'newMissionImpact') { 
      setNewMissionImpact(value);
    } else if (id === 'newObjectiveTitle') { 
      setNewObjectiveTitle(value);
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
          id="newObjectiveTitle"
          label="New Objective Title"
          fullWidth
          variant="outlined"
          value={newObjectiveTitle}
          onChange={handleChange}
        />
        Mission Impact
        <TextField
          autoFocus
          margin="dense"
          id="newMissionImpact"
          label=" New Mission Impact"
          fullWidth
          variant="outlined"
          value={newMissionImpact}
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
