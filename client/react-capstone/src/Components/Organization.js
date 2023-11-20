import ButtonAppBar from './ButtonAppBar';
import React,  { useState } from 'react'
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

export default function Organization() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonAppBar />
      <Grid item xs={25}>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            height="100%"
          >
            <Grid item xs={25}>

            <OrgOkr/>
            </Grid>
            <Grid item xs={25} ></Grid>
          </Grid>
      </Grid>
    </>
  );
}
