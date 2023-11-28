import React, { useState, useEffect, useContext } from "react";
import ButtonAppBar from "./ButtonAppBar";
import { Grid } from "@mui/material";
import Switch from '@mui/material/Switch';
import PersonalOkr from "./miniComponents/PersonalOkr";
import OrgOkr from "./miniComponents/OrgOkr";
import Divider from '@mui/material/Divider';
import { UserContext } from "./UserContext";
import SummaryGraph from "./miniComponents/summaryGraph";
import { styled } from '@mui/system';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
let completedObj = 0;
let totalObj = 0;

const HomePage = () => {
  const [objectivesData, setObjectivesData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8081/objectives")
      .then((res) => res.json())
      .then((allData) => allData.filter(entry => entry.organization_id === user.organization_id))
      .then(filteredData => setObjectivesData(filteredData))
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:8081/Personal_objectives")
      .then((res) => res.json())
      .then((allData) => allData.filter(entry => entry.user_id === user.id))
      .then(filteredData => setPersonalData(filteredData))
  }, [user]);

  const setSummaryValues = (data) => {
    completedObj = 0;
    totalObj = 0;
    data.forEach(entry => (
      completedObj += (entry.success_count)
    ));
    data.forEach(entry => (
      totalObj += entry.target_value
    ));
  }

  return (
    <div>
      <ButtonAppBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={5}
      >
        <Grid item xs={25} >
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            height="100%"
          >
            <Grid item xs={25} style={{
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                marginBottom: '16px',
              }}>
              <OrgOkr />
            </Grid>
            <Grid item xs={25} 
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              marginBottom: '16px',
            }}
            >
              <PersonalOkr />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={25}

        >
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            height="100%"
          >
            <Grid item xs={25}
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
              }}
            >
              {setSummaryValues(objectivesData)}
              <SummaryGraph complete={completedObj} total={totalObj} />
            </Grid>
            <Grid item xs={25}
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
              }}
            >
              {setSummaryValues(personalData)}
              <SummaryGraph complete={completedObj} total={totalObj} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
