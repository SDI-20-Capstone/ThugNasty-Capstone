import React, { useState,useEffect,useContext } from "react";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { UserContext } from "../UserContext";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularWithValueLabel from "./CircularWithValueLabel";
import AddKr from "./AddKr";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddObj from "./AddObj";


const OrgOkr = () => {
  const [orgOkr, setOrgOkr] = useState([{}]);
  const { user } = useContext(UserContext);
  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [measurementValue, setMeasurementValue] = useState("");
  const [successOrFail, setSuccessOrFail] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:8081/objectives")
      .then((res) => res.json())
      .then((data) => data.filter((entry) => entry.id === user.organization_id))
      .then((filteredData) => setOrgOkr(filteredData));
  }, [user]);

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const [addDialog, setAddDialog] = useState(false);

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue("");
  };

  const handleAddDialogSubmit = () => {
    const measurement = parseFloat(measurementValue);
    if (!isNaN(measurement)) {
      setMeasurementCount(measurementCount + measurement);
      setSuccessCount(successCount + (measurement > 0 ? 1 : 0));
    }

    setAddDialog(false);
    setMeasurementValue("");
    setSuccessOrFail("");
  };

  return (
    <Paper>
        <AddObj/>
      {orgOkr.map((row, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${row.title}-content`}
            id={`panel-${row.title}-header`}
          >
            <Typography>{row.title}</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {/* <Typography>{row.target_value} </Typography> */}
            </div>
            <div>
             
               <Typography>{row.mission_impact} </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handleAddMeasurement}
                color="primary"
                aria-label="add measurement"
              >
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
                    value=""
                    onChange={(e) => setSuccessOrFail(e.target.value)}
                    fullWidth
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    label=""
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
                  <Button onClick={handleAddDialogSubmit} color="primary">
                    Submit
                  </Button>
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

export default OrgOkr;
