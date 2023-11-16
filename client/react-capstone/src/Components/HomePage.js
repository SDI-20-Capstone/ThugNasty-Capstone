import React from "react";
import ButtonAppBar from "./ButtonAppBar";
import { Grid } from "@mui/material";
import Switch from '@mui/material/Switch';
import PersonalOkr from "./miniComponents/PersonalOkr";
import OrgOkr from "./miniComponents/OrgOkr";
import PersonalGraph from "./miniComponents/PersonalGraph";
import OrganizationGraph from "./miniComponents/OrganizationGraph";
import Divider from '@mui/material/Divider';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
// import { Form } from "react-router-dom";

const HomePage = () => {

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
            Grid 1
            <OrgOkr/>
            </Grid>
            <Grid item xs={25} >
            {/* <Form>

            </Form> */}

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
              <OrganizationGraph/>
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
