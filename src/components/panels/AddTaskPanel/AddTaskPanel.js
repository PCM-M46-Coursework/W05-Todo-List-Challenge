import React, { useState } from 'react';
import
{
    Paper,
    Typography,
    Stack,
    TextField,
    Button,
    Tooltip
} from '@mui/material';
import './AddTaskPanel.css';

/**
 * A component for adding a new task to a list.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.addTaskToList - A function to add a new task to the list.
 * @returns {JSX.Element} - The rendered component.
 */
export default function AddTaskPanel({ addTaskToList })
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    /**
     * Called when the Add button within the rendered component is clicked.
     */
    function onSubmit()
    {
        addTaskToList(title, description);
        setTitle('');
        setDescription('');
    }

    /**
     * Called when the Random button within the rendered component is clicked.
     */
    async function onRandom()
    {
        const random = Math.ceil(Math.random() * 149);
        const response = await fetch(`https://dummyjson.com/todos/${random}`);
        const json = await response.json();
        setTitle(json.todo);
        setDescription('');
    }

    return (
        <Paper elevation={3} className="add-task-panel">
            <Stack gap={2}>
                <Stack direction={"row"} alignItems={"center"}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Stack>
                <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
                    <Button onClick={onRandom} variant="outlined" size="large" sx={{ width: 100 }} disableElevation>
                        <Typography>Random</Typography>
                    </Button>
                    <Button onClick={onSubmit} variant="contained" size="large" sx={{ width: 100 }} disableElevation>
                        <Typography>Add</Typography>
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}