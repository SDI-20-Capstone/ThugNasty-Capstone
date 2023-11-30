import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularWithValueLabel from "./CircularWithValueLabel";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddPersObj from "./AddPersObj";
import { UserContext } from "../UserContext";
import AddPersKr from "./AddPersKr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
      .then((data) => data.filter((entry) => entry.user_id === user.id))
      .then((filteredData) => setPersonalOkr(filteredData));
  }, [user, keyResultsId, objAdded, krAdded]);

  const handleAddMeasurement = () => {
    setAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setAddDialog(false);
    setMeasurementValue("");
  };

  const handleAddDialogSubmit = (event) => {
    event.preventDefault();
    let jsonMeasuredData = {
      personal_key_result_id: keyResultsId,
      date: date,
      count: measurementValue,
      success: successOrFail,
      notes: notes,
    };

    let jsonPatchData = {
      personal_key_result_id: keyResultsId,
      count: getCount(keyResultsId),
      success: successOrFail,
    };

    fetch("http://localhost:8081/personal_measurements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonMeasuredData),
    }).then((response) => {
      if (response.status === 201) {
        alert("Measurement added successfully");
        handleAddDialogClose();
      }
    });

    fetch("http://localhost:8081/personal_key_results", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonPatchData),
    }).then((response) => {
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
      <AddPersObj objAdded={objAdded} setObjAdded={setObjAdded} />
      {personalOkr.map((row, index) => (
        <Accordion
          key={row.user_id}
          style={{
            backgroundColor: "white",
            border: "1px solid #92cbff",
            width: "100%",
            height: "100%",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${row.objective}-content`}
            id={`panel-${row.objective}-header`}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              variant="h6"
              style={{ fontFamily: "Georgia", fontSize: "17px" }}
            >
              {row.objective}
            </Typography>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              paddingRight: "8px",
              }}>
              <AddPersKr
                objTitle={row.objective}
                krAdded={krAdded}
                setKrAdded={setKrAdded}
              />
            </div>
          </AccordionSummary>
          {row.objectives.map((entry) => (
            <AccordionDetails
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // padding: '146px'
              }}
              key={entry.kr_id}
            >
              <div>
                <Typography
                  variant="h6"
                  style={{ fontFamily: "Georgia", fontSize: "17px" }}
                >
                  {row.mission_impact}{" "}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Georgia",
                    fontSize: "17px",
                    textAlign: "left",
                  }}
                >
                  {entry.kr_title}{" "}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: entry.kr_id !== null ? "row" : 'column',
                  justifyContent: entry.kr_id !== null ? "space-between" : 'center',
                  textAlign: entry.kr_id !== null ? "left" : "center",
                  alignItems: "center",
                  margin: row.objective_id !== null ? "auto" : "auto",
                }}
              >
                {entry.kr_id !== null ?
                <IconButton
                  onClick={() => {
                    setKeyResultsId(entry.kr_id);
                    handleAddMeasurement();
                  }}
                  color="primary"
                  aria-label="add measurement"
                >
                  <AddIcon />
                </IconButton> :
                <></>}
                {entry.kr_id !== null ?
                <Typography>{`${entry.success_count}/${entry.target_value}`}</Typography> :
                <div>Click On the Add Kr Button To Add a New Key Result</div> }
                <Dialog open={addDialog} onClose={handleAddDialogClose}>
                  <DialogTitle>
                    User: {user.first_name}
                  </DialogTitle>
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
                      <DemoContainer components={["DatePicker"]}>
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
              {entry.kr_id !== null ?
              <CircularWithValueLabel
                successCount={entry.success_count}
                targetValue={entry.target_value}
              /> :
              <></> }
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </Paper>
  );
};

export default PersonalOkr;
