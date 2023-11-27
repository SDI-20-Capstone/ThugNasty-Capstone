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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("")
  const [keyResultsId, setKeyResultsId] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/home_orginfo")
      .then((res) => res.json())
      .then((data) => data.filter((entry) => entry.organization_id === user.organization_id))
      .then((filteredData) => setOrgOkr(filteredData));
  }, [measurementValue]);

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const [addDialog, setAddDialog] = useState(false);

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue("");
  };
  console.log(keyResultsId)
  const handleAddDialogSubmit = (event) => {
    event.preventDefault();
    let jsonMeasuredData = {
      key_result_id: keyResultsId,
      date: date.format('YYYY-MM-DD'),
      count: measurementValue,
      success: successOrFail,
      notes: notes
    };

    let jsonPatchData = {
      key_result_id: keyResultsId,
      count: getCount(keyResultsId),
      success: successOrFail
    }
    console.log(jsonPatchData)
    fetch("http://localhost:8081/measurements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonMeasuredData),
        })
        .then((response) => {
          if (response.status === 201){
          alert('Measurement added succesfully');
          handleAddDialogClose();
          }
        })
    fetch("http://localhost:8081/key_results", {
      method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonPatchData),
    })
    .then((response) => {
      if (response.status === 201){
      setDate("")
      setKeyResultsId("")
      setNotes("")
      setSuccessOrFail("")
      setMeasurementValue("")
      }
    })
  }

  const getCount = (kr_id) => {
    let krData = orgOkr.map(entry => entry.objectives.filter(kr => kr.kr_id === kr_id))
    let success_count = krData[0][0].success_count
    let fail_count = krData[0][0].fail_count
    let currentCount = parseInt(measurementValue)
    if (successOrFail === true){
      return currentCount + success_count
    } else {
      return currentCount + fail_count
    }
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
              <Typography>{row.mission_impact} </Typography>
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
                  onClick={() => {
                    setKeyResultsId(entry.kr_id)
                    handleAddMeasurement()}}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Date"
                          value={date}
                          onChange={(newValue) => setDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    Notes
                    <TextField
                      label=""
                      variant="filled"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
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

              successCount={entry.success_count}
            targetValue={entry.target_value}/>
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