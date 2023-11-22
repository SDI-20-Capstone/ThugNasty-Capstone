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
  const [orgOkr, setOrgOkr] = useState([]);
  const { user } = useContext(UserContext);
  const [measurementCount, setMeasurementCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [measurementValue, setMeasurementValue] = useState("");
  const [successOrFail, setSuccessOrFail] = useState("");
  const [newMeasurement, setNewMeasurement] = useState();
  const [title, setTitle] = useState("");
  const [missionImpact, setMissionImpact] = useState('');

  useEffect(() => {
    fetch("http://localhost:8081/home_orginfo")
      .then((res) => res.json())
      .then((data) => data.filter((entry) => entry.organization_id === user.organization_id))
      .then((filteredData) => setOrgOkr(filteredData));
  }, [user]);

  console.log(orgOkr)

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const [addDialog, setAddDialog] = useState(false);

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue("");
  };

  const handleAddDialogSubmit = (event) => {
    event.preventDefault();
    let jsonMeasuredData = {
      target_value: newMeasurement.target_value,
      successCount: newMeasurement.successCount
    };

    fetch("http://localhost:8081/key_results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonMeasuredData),
        })
        .then((response) => {
          if (response.status === 200)
          setTitle("");
          setMissionImpact("");
          alert('OBJ added succesfully');
        })

  }

  return (
    <Paper>
        <AddObj/>
      {orgOkr.map((row,index) => (
        <Accordion key={row.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${row.objective_title}-content`}
            id={`panel-${row.objective_title}-header`}
          >
            <Typography>{row.objective_title}</Typography>
          </AccordionSummary>
            {row.objectives.map(entry => (
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
                  <Typography>{entry.kr_title} </Typography>
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
                <Typography>{`${entry.success_count}/${entry.target_value}`}</Typography>
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
              <CircularWithValueLabel
              
              successCount={row.success_count}
            targetValue={row.target_value}/>
              <div>
                <AddKr />
              </div>
          </AccordionDetails>
              ))}
        </Accordion>
      ))}
    </Paper>
  );
};

export default OrgOkr;
