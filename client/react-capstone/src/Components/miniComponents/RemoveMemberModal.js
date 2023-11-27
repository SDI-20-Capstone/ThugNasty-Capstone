import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const RemoveMemberModal = ({ open, onClose, onRemoveMember, memberList }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleRemoveMember = () => {
    if (selectedMember) {
      onRemoveMember(selectedMember.id);
      setSelectedMember(null);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Autocomplete
          options={memberList}
          getOptionLabel={(member) => `${member.last_name}, ${member.first_name}, ${member.rank}, ${member.email}`}
          value={selectedMember}
          onChange={(event, newValue) => setSelectedMember(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Search for a member" fullWidth />
          )}
        />
        <Button variant="contained" color="secondary" onClick={handleRemoveMember}>
          Remove Member
        </Button>
      </Box>
    </Modal>
  );
};

export default RemoveMemberModal;