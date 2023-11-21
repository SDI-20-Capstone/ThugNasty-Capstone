import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const AddUnitModal = ({ open, onClose, onAddUnit }) => {
    const [unit, setUnit] = useState("");
    const [parent_org, setParentOrg] = useState("");


    const handleAddUnit = (unitInfo) => {
        let jsonData = {
            unit: unitInfo.unit,
            parent_org: unitInfo.parent_org
        };

        fetch("http://localhost:8081/organization", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        })
            .then((response) => {
                if (response.status === 201) {
                    setUnit("");
                    setParentOrg("");
                    alert("Unit added successfully");
                } else {
                    setUnit("");
                    setParentOrg("");
                    alert("Something went wrong, please try again");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred, please try again");
            });

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <TextField
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={unit}
                    onChange={event => setUnit(event.target.value)}
                    margin="normal"
                />
                <FormControl fullWidth>
                    <InputLabel id="parent_org">Parent Org</InputLabel>
                    <Select
                        labelId="parent_org"
                        id="parent_org_select"
                        value={parent_org}
                        label="Parent Org"
                        onChange={event => setParentOrg(event.target.value)}
                    >
                        <MenuItem value={1}>SLD 30</MenuItem>
                        <MenuItem value={2}>30 OG</MenuItem>
                        <MenuItem value={3}>30 MSG</MenuItem>
                        <MenuItem value={4}>30 MDG</MenuItem>
                        <MenuItem value={5}>30 CPTS</MenuItem>
                        <MenuItem value={6}>2 ROPS</MenuItem>
                        <MenuItem value={7}>2 SLS</MenuItem>
                        <MenuItem value={8}>30 OSS</MenuItem>
                        <MenuItem value={9}>30 SCS</MenuItem>
                        <MenuItem value={10}>30 CES</MenuItem>
                        <MenuItem value={11}>30 CONS</MenuItem>
                        <MenuItem value={12}>30 FSS</MenuItem>
                        <MenuItem value={13}>30 LRS</MenuItem>
                        <MenuItem value={14}>30 SFS</MenuItem>
                        <MenuItem value={15}>30 HCONS</MenuItem>
                        <MenuItem value={16}>30 OMRS</MenuItem>
                    </Select>
                </FormControl>
                {/* <TextField
                    fullWidth
                    label="unit"
                    name="unit"
                    value={unit}
                    onChange={event => setUnit(event.target.value)}
                    margin="normal"
                /> */}
                <Button variant="contained" onClick={() => {
                    handleAddUnit({
                        unit: unit,
                        parent_org: parent_org,

                    })
                }}>Add Unit</Button>
            </Box>
        </Modal>
    );
};

export default AddUnitModal;