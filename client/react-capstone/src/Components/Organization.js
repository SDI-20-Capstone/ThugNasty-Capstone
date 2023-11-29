import ButtonAppBar from './ButtonAppBar';
import React,  { useState, useEffect, useContext } from 'react'
import {
  Paper,
  Typography,
} from "@mui/material";
import { UserContext } from "./UserContext";
import { Grid, Button } from "@mui/material";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import OrganizationGraph from './miniComponents/OrganizationGraph';
import AddObj from './miniComponents/AddObj'
import * as XLSX from "xlsx"



export default function Organization() {
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [objectivesData, setObjectivesData] = useState([]);

  const handleDownload = () => {
    const rows = objectivesData.map((organization) => ({

      objective_title: organization.title,
      mission_impact: organization.mission_impact,
      startDate: organization.start_date,
      endDate: organization.end_date,
      targetValue: organization.target_value,
      succes: organization.success_count,
      fail: organization.fail_count,
    }));

    // THIS CREATES THE WORKBOOK
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Organization Objectives");

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Org Objective Title",  "Org Objective Mission Impact", "Start Date", "End Date", "Target Value", "Success Count","Fail Count"],
    ]);

    // THIS WILL WRITE THE FILE AND YOU CAN SET THE NAME FOR THE FILE
    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
    alert('Download completed successfully!');
  }



  useEffect(() => {
    fetch("http://localhost:8081/organization_page")
      .then((res) => res.json())
      .then((allData) => {
        const userOrganizationData = allData.find(item => item.id === user.organization_id);

        if (userOrganizationData) {
          setData(prevData => [userOrganizationData]);

          let parentOrgData;
          let parentParentOrgData;

          if (userOrganizationData.parent_name) {
            parentOrgData = allData.filter(item => item.unit_name === userOrganizationData.parent_name);
            setData(prevData => [...prevData, ...parentOrgData]);
          }

          if (parentOrgData && parentOrgData.length > 0 && parentOrgData[0].parent_name) {
            parentParentOrgData = allData.filter(item => item.unit_name === parentOrgData[0].parent_name);
            setData(prevData => [...prevData, ...parentParentOrgData]);
          }
        }
      })
  }, [user]);


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleTabClick = async (organizationId) => {
    try {
      const response = await fetch(`http://localhost:8081/organization/${organizationId}/objectives`);
      const objectivesData = await response.json();
      setObjectivesData(objectivesData);
    } catch (error) {
      console.error('Error fetching objectives:', error);
    }
  };

  return (
    <>
      <ButtonAppBar />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label={currentTab} centered>
              {data.map((item) => (
                <Tab
                  key={item.id}
                  label={item.unit_name}
                  value={item.id}
                  onClick={() => handleTabClick(item.id)}
                />
                
              ))}
              <div>
              <Button onClick={handleDownload} style={{backgroundColor: '#92cbff', color: 'black'}} >Export to Excel</Button>
              </div>
            </TabList>
          </Box>
          {data.map((item) => (
            <TabPanel key={item.id} value={item.id}>
              {objectivesData.map((objective) => (
                <Paper key={objective.id} elevation={3} style={{ padding: 16, marginBottom: 16 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Key Result: {objective.title}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Mission Impact: {objective.mission_impact}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Start Date: {objective.start_date}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>End Date: {objective.end_date}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Target Value: {objective.target_value}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Success Count: {objective.success_count}</Typography>
                      <Typography variant="h6" style={{ fontFamily: 'Georgia', textAlign: 'left'}}>Fail Count: {objective.fail_count}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <OrganizationGraph
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
          ))}
        </TabContext>
      </Box>
    </>
  );
}