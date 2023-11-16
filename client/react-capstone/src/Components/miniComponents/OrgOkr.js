import React from 'react'
import TableContainer from "@mui/material/TableContainer";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

const OrgOkr = () => {
  const [orgOkr, setOrgOkr] = useState([{}]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:8081/objectives')
    .then(res => res.json())
    .then(data => data.filter(entry => entry.id === user.organization_id))
    .then(filteredData => setOrgOkr(filteredData))
  }, [user])

  console.log(orgOkr)

  const Objective1 = { name: 'Objective1', value: 'KR1' };
  const Objective2 = { name: 'Objective2', value: 'KR2' };
  const Objective3 = { name: 'Objective3', value: 'KR3' };

  const unionArray = [Objective1, Objective2,Objective3];
  return (
    <TableContainer component={Paper}>
            <Table className='' aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Your Organization OKRs</TableCell>
                  <TableCell align="center">Key Results</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orgOkr.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scopr="row">
                      {row.title}
                    </TableCell>
                  </TableRow>
                ))}
                {/* {
                  unionArray.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      {Object.keys(row).map((key) =>
                        key === "name" ? (
                          ""
                        ) : (
                          <TableCell align="center">

                            <FormControl
                              variant="outlined"
                              className=''
                            >
                              <InputLabel htmlFor="outlined-age-native-simple">
                                Keys
                              </InputLabel>
                              <Select
                                native
                                label="Value"
                              >
                                <option aria-label="None" value="" />
                                <option>{key}:{row[key]}</option>
                              </Select>
                            </FormControl>
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  ))} */}
              </TableBody>
            </Table>
          </TableContainer>
  )
}

export default OrgOkr