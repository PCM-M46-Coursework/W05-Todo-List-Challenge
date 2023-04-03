import React, { useState } from 'react';
import { Typography } from '@mui/material';
import
    {
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        TextField,
        Button,
    } from '@mui/material';


export default function AddEditTaskListDialogue({ initialList = {}, onClose, onConfirm, type, open = false })
{
    console.log(initialList);

    const [title, setTitle] = useState(() => initialList.title || '');
    const [description, setDescription] = useState(() => initialList.description || '');

    function handleConfirm()
    {
        const updatedList = { ...initialList, title, description };
        onConfirm(updatedList);
        setTitle('');
        setDescription('');
    }

    function handleClose()
    {
        onClose();
        setTitle('');
        setDescription('');
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>                
                <Typography variant='subtitle1'>{type} Task List</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    <Typography variant='button'>Cancel</Typography>
                </Button>
                <Button onClick={handleConfirm} disabled={!title.trim()}>
                    <Typography variant='button'>{type}</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}