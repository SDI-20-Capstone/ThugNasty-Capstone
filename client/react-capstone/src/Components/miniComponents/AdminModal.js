import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const AddMemberModal = ({ open, onClose, onAddMember }) => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organization_id, setOrganization_id] = useState("");
    const [rank, setRank] = useState("");

    const handleAddMember = (memberInfo) => {
        let jsonData = {
            first_name: memberInfo.first_name,
            last_name: memberInfo.last_name,
            email: memberInfo.email,
            password: memberInfo.password,
            organization_id: memberInfo.organization_id,
            rank: memberInfo.rank,
        };

        fetch("http://localhost:8081/addMember", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        })
            .then((response) => {
                if (response.status === 201) {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");  // Clear the password state
                    setOrganization_id("");
                    setRank("");
                    alert("Member added to unit successfully");
                } else {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");  // Clear the password state
                    setOrganization_id("");
                    setRank("");
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
                    label="First Name"
                    name="firstName"
                    value={first_name}
                    onChange={event => setFirstName(event.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={last_name}
                    onChange={event => setLastName(event.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Rank"
                    name="Rank"
                    value={rank}
                    onChange={event => setRank(event.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    margin="normal"
                />
                <FormControl fullWidth>
                    <InputLabel id="unit-dropdown">Unit</InputLabel>
                    <Select
                        labelId="unit-dropwdown"
                        id="unit-select"
                        value={organization_id}
                        label="unit"
                        onChange={event => setOrganization_id(event.target.value)}
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
                    handleAddMember({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password,
                        organization_id: organization_id,
                        rank: rank
                    })
                }}>Add Member</Button>
            </Box>
        </Modal>
    );
};

export default AddMemberModal;