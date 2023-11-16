import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddMemberModal = ({ open, onClose, onAddMember }) => {
    const [memberInfo, setMemberInfo] = useState({
        firstName: '',
        lastName: '',
        age: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleAddMember = () => {
        onAddMember(memberInfo);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={memberInfo.firstName}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={memberInfo.lastName}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Rank"
                    name="Rank"
                    value={memberInfo.Rank}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="Email"
                    value={memberInfo.Email}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <Button variant="contained" onClick={handleAddMember}>Add Member</Button>
            </Box>
        </Modal>
    );
};

export default AddMemberModal;