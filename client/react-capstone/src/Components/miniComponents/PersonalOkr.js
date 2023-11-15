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
  MenuItem
}from "@mui/material";

const PersonalOkr = () => {
    const personal1 = { name: 'personal1', value: 'KR1' };
    const personal2 = { name: 'personal2', value: 'KR1' };
    const personal3 = { name: 'personal3', value: 'KR1' };
    const unionArray = [personal1,personal2,personal3];
  return (
   <div>
    <br></br>
    <TableContainer component={Paper}>
            <Table className='' aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Your OKRs</TableCell>
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
  
   </div>
  )
}

export default PersonalOkr