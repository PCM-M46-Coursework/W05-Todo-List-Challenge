import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

import ListIcon from '@mui/icons-material/List';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import AddEditTaskListDialogue from '../AddEditTaskListDialogue';
import ConfirmDialogue from '../ConfirmDialogue';

import './SideBar.css';
import { Tooltip } from '@mui/material';
import { isEmpty } from 'lodash';

export default function SideBar({ taskLists, setSelected, isArchiveSelected, onArchiveButtonClicked, addTaskList, editTaskList, deleteTaskList })
{
    const [dlgAddEdit, toggleAddEditDialogue] = useState({ open:false });
    const [dlgDelete, toggleDeleteDialogue] = useState({ open: false });

    function onAdd(title, description)
    {
        addTaskList(title, description);
        toggleAddEditDialogue({ open: false });
    }

    function onEdit(list)
    {
        editTaskList(list);
        toggleAddEditDialogue({ open: false });
    }

    function onDelete(list)
    {
        deleteTaskList(list);
        toggleDeleteDialogue({ open: false });
    }

    function openArchive() 
    {
        onArchiveButtonClicked();
    }

    function openAddDialogue()
    {
        return toggleAddEditDialogue({
            open: true,
            type: "Add",
            onConfirm: onAdd,
            initialList: {}
        });
    }

    return (
        <Paper elevation={3} className='sidebar-left'>
            <Stack className='top row' direction="row" justifyContent="right" gap={2}>                
                <Typography onClick={openAddDialogue} className=".top-text" variant="button">Add New List</Typography>
                <AddSharpIcon onClick={openAddDialogue} />
            </Stack>
            <Stack onClick={() => openArchive()} className={`row ${(isArchiveSelected === true) && "selected"}`} direction="row" gap={2}>
                <Inventory2OutlinedIcon />
                <Typography className=".top-text">Archive</Typography>
            </Stack>
            <Divider variant="middle" />
            {taskLists.map(list =>
            {
                // Define, and inject new functions to inject, to resolve
                // the captured dependency issues with closures.

                const onDeleteClick = () => toggleDeleteDialogue({
                    open: true,
                    title: list.title,
                    list: list
                });

                const onEditClick = () => toggleAddEditDialogue({
                    open: true,
                    type: "Edit",
                    onConfirm: onEdit,
                    initialList: list
                });
                
                return <Stack onClick={() => setSelected(list)} key={list.id} className={`row ${list.selected && "selected"}`} direction="row" gap={2}>
                    <ListIcon />
                    <Typography variant="body1">{list.title}</Typography>
                    <Stack sx={{ height:16 }} className="glyphs" direction="row" gap={2}>
                        <Tooltip sx={{ mr:1 }} title="Edit">
                            <ModeEditOutlinedIcon onClick={onEditClick} />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <DeleteForeverOutlinedIcon onClick={onDeleteClick} />
                        </Tooltip>
                    </Stack>
                </Stack>;
            }
            )} 
            
            {/* Dialogue Forms */}

            {dlgDelete.open &&
            <ConfirmDialogue
                open={dlgDelete.open}
                title={dlgDelete.title}
                message='Are you sure you wish to delete this Task List?'
                onOk={() => onDelete(dlgDelete.list)}
                onCancel={() => toggleDeleteDialogue({ open: false })}
            />}

            {dlgAddEdit.open &&
            <AddEditTaskListDialogue 
                open={dlgAddEdit.open}
                initialList={dlgAddEdit.initialList}
                type = {dlgAddEdit.type}
                onConfirm={dlgAddEdit.onConfirm}
                onClose={() => toggleAddEditDialogue({ open: false })}
            />}
        </Paper>
    );
}