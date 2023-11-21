import ButtonAppBar from './ButtonAppBar';
import React,  { useState, useEffect, useContext } from 'react'
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
import { UserContext } from "./UserContext";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import OrgOkr from "./miniComponents/OrgOkr";
import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import OrganizationGraph from './miniComponents/OrganizationGraph';
import AddObj from './miniComponents/AddObj'


export default function Organization() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [objectivesData, setObjectivesData] = useState([]);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        {user.role !== "user" ?
        <AddObj /> :
        <></>
        }
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
            </TabList>
          </Box>
          {data.map((item) => (
            <TabPanel key={item.id} value={item.id}>
              <Typography variant="h5">{item.unit_name}</Typography>
              {/* Display objectives here based on the fetched data */}
              {objectivesData.map((objective) => (
                <Paper key={objective.id} elevation={3} style={{ padding: 16, marginBottom: 16 }}>
                  <Typography variant="h6">Title: {objective.title}</Typography>
                  <Typography>Mission Impact: {objective.mission_impact}</Typography>
                  <Typography>Start Date: {objective.start_date}</Typography>
                  <Typography>End Date: {objective.end_date}</Typography>
                  <Typography>Target Value: {objective.target_value}</Typography>
                  <Typography>Success Count: {objective.success_count}</Typography>
                  <Typography>Fail Count: {objective.fail_count}</Typography>
                  <OrganizationGraph success={objective.success_count} fail={objective.fail_count} total={objective.target_value} />                </Paper>
              ))}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
}
