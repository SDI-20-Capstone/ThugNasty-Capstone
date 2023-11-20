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

export default function Organization() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/organization_page")
      .then((res) => res.json())
      .then((filteredData) => {
        const userOrganizationData = filteredData.filter(item => item.id === user.organization_id);
        setData(userOrganizationData);
      });
  }, [user]);

  const findParentHierarchy = (unitId) => {
    const hierarchy = [];
    let currentUnit = data.find(item => item.id === unitId);

    while (currentUnit && currentUnit.id !== user.organization_id) {
      hierarchy.unshift(currentUnit.unit_name);
      currentUnit = data.find(item => item.id === currentUnit.parent_id);
    }

    return hierarchy.join(' > ');
  };

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
      {data.length > 0 && (
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        {data.map(item => (
          <Tab key={item.id} label={item.unit_name} value={item.id}>
            <>
              <div>{item.unit_name}</div>
            </>
              {/* <strong>Parent Hierarchy:</strong> {findParentHierarchy(item.id)} <br /> */}
          </Tab>
        ))}
      </Tabs>
      )}
    </>
  );
}