import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

export default function AddObj() {
  const [openAdd, setOpenAdd] = useState(false);
const [newObj, setNewObj] = useState();
const [title, setTitle] = useState("");

  const handleOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    
    let jsonData = {
        title: newObj.title,
        missionImpact: newObj.missionImpact
    };

    fetch('http://localhost:8081/objectives', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(jsonData)
    });
 setNewObj({title: '', missionImpact: ''})
    setOpenAdd(false);
  };

    const handleChange = (event) => {
        
    }

  return (
    <div>
        
      <Button variant="outlined" color="primary" onClick={handleOpen}>
       <AddIcon/> Add Organization Objective
      </Button>
      <Dialog
         open={openAdd}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Personal Objective</DialogTitle>
        <DialogContent>
          <DialogContentText>Organization: Org will be here</DialogContentText>
        </DialogContent>
        Objective
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=""
          fullWidth
          variant="outlined"
        />
        Mission Impact
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=""
          fullWidth
          variant="outlined"
        />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}