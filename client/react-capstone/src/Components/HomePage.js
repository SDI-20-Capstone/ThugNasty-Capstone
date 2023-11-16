import React from "react";
import ButtonAppBar from "./ButtonAppBar";
import { Grid } from "@mui/material";
import PersonalOkr from "./miniComponents/PersonalOkr";
import OrgOkr from "./miniComponents/OrgOkr";
import PersonalGraph from "./miniComponents/PersonalGraph";
import OrganizationGraph from "./miniComponents/OrganizationGraph";
import Divider from '@mui/material/Divider';
import * as Plot from "@observablehq/plot";
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


// reference sandbox

// xVal = (measurement_table.count / key_results_table.target_value||target_percent)
// yVal = ()

// Plot.plot({
//   x: {
//     axis: "top",
//     grid: true,
//     percent: true
//   },
//   marks: [
//     Plot.ruleX([0]),
//     Plot.barX(alphabet, {x: "Completion", y: "Objectives"})
//   ]
// })