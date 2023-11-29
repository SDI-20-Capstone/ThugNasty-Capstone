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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const OrgOkr = () => {
  const [orgOkr, setOrgOkr] = useState([]);
  const { user } = useContext(UserContext);
  const [measurementValue, setMeasurementValue] = useState("");
  const [successOrFail, setSuccessOrFail] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("")
  const [keyResultsId, setKeyResultsId] = useState("");
  const [objAdded, setObjAdded] = useState(false)
  const [krAdded, setKrAdded] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8081/home_orginfo")
      .then((res) => res.json())
      .then((data) => data.filter((entry) => entry.organization_id === user.organization_id))
      .then((filteredData) => setOrgOkr(filteredData));
  }, [user, keyResultsId, objAdded, krAdded]);

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
    let filteredKrData = krData.filter(entry => entry.length === 1);
    let success_count = filteredKrData[0][0].success_count
    let fail_count = filteredKrData[0][0].fail_count
    let currentCount = parseInt(measurementValue)
    if (successOrFail === true){
      return currentCount + success_count
    } else {
      return currentCount + fail_count
    }
  }

  return (
    <Paper>
      {orgOkr.map((row,index) => (
        <Accordion key={row.id} style={{backgroundColor:'white', border: '1px solid #92cbff', width:'100%'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${row.objective_title}-content`}
            id={`panel-${row.objective_title}-header`}
          >
            <Typography variant="h6" style={{ fontFamily: 'Georgia', fontSize: '17px'}}>{row.objective_title}</Typography>
            {user.role !== 'user' ?
            <div>
              <AddKr obj_title={row.objective_title} krAdded={krAdded} setKrAdded={setKrAdded}/>
            </div> :
            <></> }
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
            {/* <div>
              <Typography variant="h6" style={{ fontFamily: 'Georgia', fontSize: '17px'}}>{row.mission_impact} </Typography>
            </div> */}
                <div>
                  <Typography variant="h6" style={{ fontFamily: 'Georgia', fontSize: '17px'}}>{entry.kr_title} </Typography>
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
                {row.objective_id !== null ?
                <Typography>{`${entry.success_count}/${entry.target_value}`}</Typography> :
                <></> }
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
              {row.objective_id !== null ?
              <CircularWithValueLabel

              successCount={entry.success_count}
            targetValue={entry.target_value}/> :
            <></> }
          </AccordionDetails>
              ))}
        </Accordion>
      ))}
      {user.role !== 'user' ?
        <AddObj objAdded={objAdded} setObjAdded={setObjAdded} /> :
          <></>}
    </Paper>
  );
};

export default OrgOkr;