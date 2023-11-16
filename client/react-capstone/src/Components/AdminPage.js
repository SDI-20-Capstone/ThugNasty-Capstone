import React, { useState } from 'react';
import ButtonAppBar from './ButtonAppBar';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddMemberModal from './miniComponents/AdminModal'; // Assuming you've placed the modal in the same directory

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const memberRows = [
    { id: 1, lastName: 'Member1Last', firstName: 'Member1First', age: 25 },
    { id: 2, lastName: 'Member2Last', firstName: 'Member2First', age: 30 },
    { id: 3, lastName: 'Member3Last', firstName: 'Member3First', age: 25 },
    { id: 4, lastName: 'Member4Last', firstName: 'Member4First', age: 30 },
    // Add more member rows as needed
];

const unitRows = [
    { id: 1, lastName: 'Unit1Last', firstName: 'Unit1First', age: 40 },
    { id: 2, lastName: 'Unit2Last', firstName: 'Unit2First', age: 35 },
    { id: 3, lastName: 'Unit3Last', firstName: 'Unit3First', age: 40 },
    { id: 4, lastName: 'Unit4Last', firstName: 'Unit4First', age: 35 },
    // Add more unit rows as needed
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
        // Add the new member to the memberRows array or your data source
        // For now, just update the state directly
        memberRows.push(newMember);
    };

    const rows = currentTab === 0 ? memberRows : unitRows;

    return (
        <div>
            <ButtonAppBar />
            <h1>Administrator Page</h1>

            {/* Add Tabs for Members and Units */}
            <Tabs value={currentTab} onChange={handleTabChange} centered>
                <Tab label="Members" />
                <Tab label="Units" />
            </Tabs>

            {/* Button to open the Add Member modal */}
            <button onClick={handleOpenAddMemberModal}>Add Member</button>

            {/* Display the DataGrid based on the selected tab */}
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