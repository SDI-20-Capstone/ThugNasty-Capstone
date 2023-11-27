import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const RemoveUnitModal = ({ open, onClose, onRemoveUnit, unitList }) => {
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleRemoveUnit = () => {
        if (selectedUnit) {
            onRemoveUnit(selectedUnit.id);
            setSelectedUnit(null);
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Autocomplete
                    options={unitList}
                    getOptionLabel={(unit) => `${unit.unit_name}`}
                    value={selectedUnit}
                    onChange={(event, newValue) => setSelectedUnit(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search for a unit" fullWidth />
                    )}
                />
                <Button variant="contained" color="secondary" onClick={handleRemoveUnit}>
                    Remove Unit
                </Button>
            </Box>
        </Modal>
    );
};

export default RemoveUnitModal;