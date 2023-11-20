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
    const [email, setEmail] = useState("")
    const [unit, setUnit] = useState("")
    const [memberInfo, setMemberInfo] = useState({
        email: '',
        unit: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMemberInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleAddMember = (event) => {
        event.preventDefault();
        let jsonData = {
            email: memberInfo.email,
            unit: memberInfo.unit
        }
        console.log(jsonData)
        fetch("http://localhost:8081/userinfo", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        })
        .then((response) => {
            if(response.status === 201){
                setMemberInfo({
                    email: "",
                    unit: ""
                })
                setEmail("");
                setUnit("");
                alert("Member added to unit successfully")
            } else {
                setMemberInfo({
                    email: "",
                    unit: ""
                })
                setEmail("");
                setUnit("");
                alert("Something went wrong, please try again")
            }
        })
        // onAddMember(memberInfo);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                {/* <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={memberInfo.first_name}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={memberInfo.last_name}
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
                /> */}
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
                    value={unit}
                    label="unit"
                    onChange={event => setUnit(event.target.value)}
                  >
                    <MenuItem value="SLD 30">SLD 30</MenuItem>
                    <MenuItem value="30 OG">30 OG</MenuItem>
                    <MenuItem value="30 MSG">30 MSG</MenuItem>
                    <MenuItem value="30 MDG">30 MDG</MenuItem>
                    <MenuItem value="30 CPTS">30 CPTS</MenuItem>
                    <MenuItem value="2 ROPS">2 ROPS</MenuItem>
                    <MenuItem value="2 SLS">2 SLS</MenuItem>
                    <MenuItem value="30 OSS">30 OSS</MenuItem>
                    <MenuItem value="30 SCS">30 SCS</MenuItem>
                    <MenuItem value="30 CES">30 CES</MenuItem>
                    <MenuItem value="30 CONS">30 CONS</MenuItem>
                    <MenuItem value="30 FSS">30 FSS</MenuItem>
                    <MenuItem value="30 LRS">30 LRS</MenuItem>
                    <MenuItem value="30 SFS">30 SFS</MenuItem>
                    <MenuItem value="30 HCOS">30 HCONS</MenuItem>
                    <MenuItem value="30 OMRS">30 OMRS</MenuItem>
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
                <Button variant="contained" onClick={() => setMemberInfo({
                    email: email,
                    unit: unit
                }, () => {
                    handleAddMember();
                })}>Add Member</Button>
            </Box>
        </Modal>
    );
};

export default AddMemberModal;