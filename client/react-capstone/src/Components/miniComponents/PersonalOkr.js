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
  const [personalOkr, setPersonalOkr] = useState([]);
  const { user } = useContext(UserContext);
  const [successOrFail, setSuccessOrFail] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [measurementValue, setMeasurementValue] = useState("");
  const [keyResultsId, setKeyResultsId] = useState("");
  const [objAdded, setObjAdded] = useState(false);
  const [krAdded, setKrAdded] = useState(false);
  const [addDialog, setAddDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/homepersonal_info")
      .then((res) => res.json())
      .then((data) => data.filter((entry) => entry.user_id === user.id)) // Adjust to use user.id
      .then((filteredData) => setPersonalOkr(filteredData));
  }, [user, keyResultsId, objAdded, krAdded]);

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue('');
  };

  const handleAddDialogSubmit = (event) => {
    event.preventDefault();
    let jsonMeasuredData = {
      key_result_id: keyResultsId,
      date: date,
      count: measurementValue,
      success: successOrFail,
      notes: notes,
    };

    let jsonPatchData = {
      key_result_id: keyResultsId,
      count: getCount(keyResultsId),
      success: successOrFail,
    };

    fetch("http://localhost:8081/personal_measurements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonMeasuredData),
    })
      .then((response) => {
        if (response.status === 201) {
          alert('Measurement added successfully');
          handleAddDialogClose();
        }
      });

    fetch("http://localhost:8081/personal_key_results", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonPatchData),
    })
      .then((response) => {
        if (response.status === 201) {
          setDate("");
          setKeyResultsId("");
          setNotes("");
          setSuccessOrFail("");
          setMeasurementValue("");
        }
      });
  };

  const getCount = (kr_id) => {
    let krData = personalOkr.map((entry) =>
      entry.objectives.filter((kr) => kr.kr_id === kr_id)
    );
    let filteredKrData = krData.filter((entry) => entry.length === 1);
    let success_count = filteredKrData[0][0].success_count;
    let fail_count = filteredKrData[0][0].fail_count;
    let currentCount = parseInt(measurementValue);
    if (successOrFail === true) {
      return currentCount + success_count;
    } else {
      return currentCount + fail_count;
    }
  };

  return (


    <Paper>
      {personalOkr.map((row, index) => (
        <Accordion key={row.user_id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${row.objective}-content`}
            id={`panel-${row.objective}-header`}
          >
            <Typography>{row.objective}</Typography>
          </AccordionSummary>
          {row.objectives.map((entry) => (
            <AccordionDetails
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={entry.kr_id}
            >
              <div>
                <Typography>{row.mission_impact} </Typography>
              </div>
              <div>
                <Typography>{entry.kr_title} </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  onClick={() => {
                    setKeyResultsId(entry.kr_id);
                    handleAddMeasurement();
                  }}
                  color="primary"
                  aria-label="add measurement"
                >
                  <AddIcon />
                </IconButton>
                <Typography>{`${entry.success_count}/${entry.target_value}`}</Typography>
                <Dialog open={addDialog} onClose={handleAddDialogClose}>
                  <DialogTitle>Organization: {row.organization_name}</DialogTitle>
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
                      value={successOrFail}
                      onChange={(e) => setSuccessOrFail(e.target.value)}
                      fullWidth
                      autoFocus
                      margin="dense"
                      variant="outlined"
                      label=""
                    >
                      <MenuItem value={true}> Success</MenuItem>
                      <MenuItem value={false}> Failure</MenuItem>
                    </Select>
                    {/* Add your DatePicker component here */}
                    {/* Add your Notes TextField component here */}
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
                successCount={entry.success_count}
                targetValue={entry.target_value}
              />
              <div>
                <AddKr obj_title={row.objective_title} krAdded={krAdded} setKrAdded={setKrAdded} />
              </div>
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
      <AddPersObj objAdded={objAdded} setObjAdded={setObjAdded} />
    </Paper>
  );
};

export default PersonalOkr;
