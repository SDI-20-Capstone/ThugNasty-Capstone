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

export default function Organization() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

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

  return (
    <>
      <ButtonAppBar />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleTabChange} aria-label={currentTab} centered>
              {data.map((item) => (
                <Tab key={item.id} label={item.unit_name} value={item.id} />
              ))}
            </TabList>
          </Box>
          {data.map((item) => (
            <TabPanel key={item.id} value={item.id}>{item.unit_name}</TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
}