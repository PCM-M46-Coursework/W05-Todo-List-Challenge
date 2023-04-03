import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

import ListIcon from '@mui/icons-material/List';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import AddEditTaskListDialogue from '../../dialogues/AddEditTaskListDialogue';
import ConfirmDialogue from '../../dialogues/ConfirmDialogue';

import './SideBar.css';

/**
 * The SideBar component displays a list of task lists and allows the user
 * to create, edit, and delete task lists, as well as to navigate to the archive.
 * 
 * @param {Object[]} taskLists - The list of task lists to display.
 * @param {function} setSelected - The function to call when a task list is selected.
 * @param {boolean} isArchiveSelected - Indicates whether the archive is currently selected.
 * @param {function} onArchiveButtonClicked - The function to call when the archive button is clicked.
 * @param {function} addTaskList - The function to call when a new task list is added.
 * @param {function} editTaskList - The function to call when a task list is edited.
 * @param {function} deleteTaskList - The function to call when a task list is deleted.
 * 
 * @returns {JSX.Element} The JSX representation of the SideBar component.
 */
export default function SideBar({ 
    taskLists, 
    setSelected, 
    isArchiveSelected, 
    onArchiveButtonClicked, 
    addTaskList, 
    editTaskList, 
    deleteTaskList })
{
    const [dlgAddEdit, toggleAddEditDialogue] = useState({ open:false });
    const [dlgDelete, toggleDeleteDialogue] = useState({ open: false });

    /**
     * Adds a new task list.
     * @param {string} title - The title of the new task list.
     * @param {string} description - The description of the new task list.
     */
    function onAdd(title, description)
    {
        addTaskList(title, description);
        toggleAddEditDialogue({ open: false });
    }

    /**
     * Edits an existing task list.
     * @param {Object} list - The task list to edit.
     */
    function onEdit(list)
    {
        editTaskList(list);
        toggleAddEditDialogue({ open: false });
    }

    /**
     * Deletes a task list.
     * @param {Object} list - The task list to delete.
     */
    function onDelete(list)
    {
        deleteTaskList(list);
        toggleDeleteDialogue({ open: false });
    }

    /**
     * Opens the archive view.
     */
    function openArchive() 
    {
        onArchiveButtonClicked();
    }

    /**
     * Opens the Add/Edit Task List dialogue.
     */
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
                // Define, and inject new function, to resolve
                // the captured dependency issues with closures.

                /**
                 * Deletes the clicked task list.
                 */
                const onDeleteClick = () => toggleDeleteDialogue({
                    open: true,
                    title: list.title,
                    list: list
                });

                /**
                 * Edits the clicked task list.
                 */
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