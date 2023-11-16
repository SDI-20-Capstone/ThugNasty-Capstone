import React, { useState } from 'react';
import ButtonAppBar from './ButtonAppBar';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddMemberModal from './miniComponents/AdminModal';

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'firstName', headerName: 'First name', width: 350 },
    { field: 'lastName', headerName: 'Last name', width: 350 },
    { field: 'rank', headerName: 'Rank', width: 350 },
    { field: 'email', headerName: 'Email', width: 350 },

];

const memberRows = [
    { id: 1, lastName: 'Member1Last', firstName: 'Member1First', rank: 'SSgt', email: 'john.doe@example.com' },
    { id: 2, lastName: 'Member2Last', firstName: 'Member2First', rank: 'Col',  email: 'jane.smith@example.com' }, 
    { id: 3, lastName: 'Member3Last', firstName: 'Member3First', rank: 'MSgt',  email: 'bob.roberts@example.com' },
    { id: 4, lastName: 'Member4Last', firstName: 'Member4First', rank: 'A1C',  email: 'emily.davis@example.com' },

];

const unitRows = [
    { id: 1, lastName: 'Unit1Last', firstName: 'Unit1First', age: 40 },
    { id: 2, lastName: 'Unit2Last', firstName: 'Unit2First', age: 35 },
    { id: 3, lastName: 'Unit3Last', firstName: 'Unit3First', age: 40 },
    { id: 4, lastName: 'Unit4Last', firstName: 'Unit4First', age: 35 },

];

export default function AdminPage() {
    const [currentTab, setCurrentTab] = useState(0);
    const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleOpenAddMemberModal = () => {
        setAddMemberModalOpen(true);
    };

    const handleCloseAddMemberModal = () => {
        setAddMemberModalOpen(false);
    };

    const handleAddMember = (newMember) => {

        memberRows.push(newMember);
    };

    const rows = currentTab === 0 ? memberRows : unitRows;

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: 'white' }}>
            <ButtonAppBar />
            <h1 style={{ color: 'black' }}>Administrator Page</h1>

            <Tabs value={currentTab} onChange={handleTabChange} centered>
                <Tab label="Members" />
                <Tab label="Units" />
            </Tabs>

            <button
                onClick={handleOpenAddMemberModal}
                style={{ backgroundColor: '#3385ff', color: 'white', marginRight: '1600px' }}
            >
                Add Member
            </button>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

            <AddMemberModal
                open={isAddMemberModalOpen}
                onClose={handleCloseAddMemberModal}
                onAddMember={handleAddMember}
            />
        </div>
    );
}