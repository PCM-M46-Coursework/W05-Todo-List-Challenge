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

/**
 * A dialogue component for adding/editing a task, or task list.
 * 
 * @param {object} props - The component props.
 * @param {object} [props.initial={}] - The initial object.
 * @param {function} props.onClose - The callback function to close the dialogue.
 * @param {function} props.onConfirm - The callback function to confirm the changes.
 * @param {string} props.type - The type of the dialogue (either "Add" or "Edit").
 * @param {boolean} [props.open=false] - Whether the dialogue is open or not.
 * @returns {JSX.Element} - The rendered component.
 */
export default function AddEditDialogue({ initial = {}, onClose, onConfirm, dialogueTitle, type, open = false })
{
    const [title, setTitle] = useState(() => initial.title || '');
    const [description, setDescription] = useState(() => initial.description || '');

    /**
     * Called when the user presses to OK button.
     */
    function handleConfirm()
    {
        const updatedList = { ...initial, title, description };
        onConfirm(updatedList);
        setTitle('');
        setDescription('');
    }

    /**
     * Called when the user presses to Cancel button, or clicks away from the modal form.
     */
    function handleClose()
    {
        onClose();
        setTitle('');
        setDescription('');
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>                
                <Typography variant='subtitle1'>{type} {dialogueTitle}</Typography>
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