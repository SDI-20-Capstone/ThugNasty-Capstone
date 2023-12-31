import ButtonAppBar from './ButtonAppBar';
import React, { useState, useEffect, useContext } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  Button,
} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { UserContext } from "./UserContext";
import PersonalGraph from './miniComponents/PersonalGraph';
import * as XLSX from "xlsx"


export default function Personal() {
  const { user } = useContext(UserContext);
  const [personalObjectivesData, setPersonalObjectivesData] = useState([]);
  const [currentTab, setCurrentTab] = useState('personal');


  const handleDownload = () => {
    const rows = personalObjectivesData.map((personal) => ({

      objective_title: personal.title,
      mission_impact: personal.impact,
      startDate: personal.start_date,
      endDate: personal.end_date,
      targetValue: personal.target_value,
      succes: personal.success_count,
      fail: personal.fail_count,
    }));

    // THIS CREATES THE WORKBOOK
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personal Objectives");

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Personal Objective Title",  "Personal Objective Mission Impact", "Start Date", "End Date", "Target Value", "Success Count","Fail Count"],
    ]);

    // THIS WILL WRITE THE FILE AND YOU CAN SET THE NAME FOR THE FILE
    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
    alert('Download completed successfully!');
  }

  useEffect(() => {
    const fetchPersonalObjectives = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(`http://localhost:8081/personal_key_results/${user.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const objectivesData = await response.json();
          setPersonalObjectivesData(objectivesData);
        } else {
          console.error('User ID is not available.');
          setPersonalObjectivesData([]);
        }
      } catch (error) {
        console.error('Error fetching personal objectives:', error);
      }
    };

    fetchPersonalObjectives();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <ButtonAppBar />
      <Box sx={{ width: '100%', typography: 'body1' }}>
      {/* {user.role !== "user" ?
          <AddObj /> :
          <></>
        } */}
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="Personal Objectives" centered>
              <Tab key="personal" label="Personal" value="personal" />
           <Button onClick={handleDownload} style={{backgroundColor: '#92cbff', color: 'black'}} >Export to Excel</Button></TabList>
            
          </Box>
          <TabPanel key="personal" value={currentTab}>
            {Array.isArray(personalObjectivesData) &&
              personalObjectivesData.map((objective) => (
                <Paper key={objective.id} elevation={3} style={{ padding: 16, marginBottom: 16 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Objective: {objective.title}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Impact: {objective.impact}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Start Date: {objective.start_date}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>End Date: {objective.end_date}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Target Value: {objective.target_value}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Success Count: {objective.success_count}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Fail Count: {objective.fail_count}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <PersonalGraph
                        key={objective.id}
                        success={objective.success_count}
                        fail={objective.fail_count}
                        total={objective.target_value}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}