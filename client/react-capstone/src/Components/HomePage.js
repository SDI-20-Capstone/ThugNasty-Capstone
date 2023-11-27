import React, { useState, useEffect, useContext } from "react";
import ButtonAppBar from "./ButtonAppBar";
import { Grid } from "@mui/material";
import Switch from '@mui/material/Switch';
import PersonalOkr from "./miniComponents/PersonalOkr";
import OrgOkr from "./miniComponents/OrgOkr";
import PersonalGraph from "./miniComponents/PersonalGraph";
import OrganizationGraph from "./miniComponents/OrganizationGraph";
import Divider from '@mui/material/Divider';
import { UserContext } from "./UserContext";


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const HomePage = () => {
  const [objectivesData, setObjectivesData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8081/objectives")
      .then((res) => res.json())
      .then((allData) =>  allData.filter(entry => entry.organization_id === user.organization_id))
      .then(filteredData => setObjectivesData(filteredData))
  }, [user]);

  console.log(user)

  return (
    <div>
      <ButtonAppBar />
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
         <Switch {...label} />
        {/* First row */}
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
            <Grid item xs={25} >


    <PersonalOkr/>
      <Divider orientation="vertical" flexItem />
            </Grid>

          </Grid>
        </Grid>

        {/* Second row */}
        <Grid item xs={25}>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            height="100%"
          >
            <Grid item xs={25}>
              {/* Grid 3 */}
              <OrganizationGraph />
            </Grid>
            <Grid item xs={25}>
              {/* Grid 4 */}
              <PersonalGraph/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;



