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

export default function AddPersObj() {
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
       <AddIcon/> Add Personal Objective
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
          label="outlined"
          fullWidth
          
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
