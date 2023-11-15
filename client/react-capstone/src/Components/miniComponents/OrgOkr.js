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
const OrgOkr = () => {


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
                {
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
  )
}

export default OrgOkr