import React, { useState, useEffect, useContext } from 'react';
import ButtonAppBar from './ButtonAppBar';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddMemberModal from './miniComponents/AdminModal';
import { UserContext } from './UserContext';
import AddUnitModal from './miniComponents/UnitModal';

export default function AdminPage() {
    const [currentTab, setCurrentTab] = useState(0);
    const [isAddMemberModalOpen, setAddMemberModalOpen] = useState(false);
    const [isAddUnitModalOpen, setAddUnitModalOpen] = useState(false);
    const { user } = useContext(UserContext);
    const [memberRows, setMemberRows] = useState([]);
    const [unitRows, setUnitRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/memberrows')
            .then((res) => res.json())
            .then((data) => setMemberRows(data));
        fetch('http://localhost:8081/unitrows')
            .then((res) => res.json())
            .then((data) => setUnitRows(data));
    }, [isAddMemberModalOpen]);

    const memberColumns = [
        { field: 'first_name', headerName: 'First name', width: 350 },
        { field: 'last_name', headerName: 'Last name', width: 350 },
        { field: 'rank', headerName: 'Rank', width: 350 },
        { field: 'email', headerName: 'Email', width: 350 },
        { field: 'name', headerName: 'Unit', width: 350 },
    ];

    const unitColumns = [
        { field: 'unit_name', headerName: 'Unit', width: 350 },
        { field: 'parent_name', headerName: 'Parent Org', width: 350 },
        { field: 'member_count', headerName: 'Number of Members', width: 350 },
        { field: 'objectives_count', headerName: 'Number of OKRs', width: 350 },
    ];

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleOpenAddModal = () => {
        if (currentTab === 0) {
            setAddMemberModalOpen(true);
        } else {
            setAddUnitModalOpen(true);
        }
    };

    const handleCloseAddModal = () => {
        setAddMemberModalOpen(false);
        setAddUnitModalOpen(false);
    };

    const handleAdd = (newData) => {
        if (currentTab === 0) {
            fetch('http://localhost:8081/addMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setMemberRows([...memberRows, newData]);
                        handleCloseAddModal();
                    } else {
                        console.error(data.message);

                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {

            fetch('http://localhost:8081/organization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUnitRows([...unitRows, newData]);
                        handleCloseAddModal();
                    } else {
                        console.error(data.message);

                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    const rows = currentTab === 0 ? memberRows : unitRows;
    const columns = currentTab === 0 ? memberColumns : unitColumns;
    const addButtonLabel = currentTab === 0 ? 'Add Member' : 'Add Unit';

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: 'white' }}>
            <ButtonAppBar />
            <h1 style={{ color: 'black' }}>Administrator Page</h1>

            <Tabs value={currentTab} onChange={handleTabChange} centered>
                <Tab label="Members" />
                <Tab label="Units" />
            </Tabs>

            <button
                onClick={handleOpenAddModal}
                style={{ backgroundColor: '#3385ff', color: 'white', marginRight: '1600px' }}
            >
                {addButtonLabel}
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
                onClose={handleCloseAddModal}
                onAdd={handleAdd}
                isAddingUnit={currentTab !== 0}
            />
            <AddUnitModal
                open={isAddUnitModalOpen}
                onClose={handleCloseAddModal}
                onAddUnit={handleAdd}
            />
        </div>

    );
}