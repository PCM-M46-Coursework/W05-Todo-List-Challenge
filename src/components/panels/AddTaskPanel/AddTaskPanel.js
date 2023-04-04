import AddSharpIcon from '@mui/icons-material/AddSharp';

import {
    Paper,
    Typography,
    Stack,
    TextField,
    Button
} from '@mui/material';

import './AddTaskPanel.css';

export default function AddTaskPanel()
{
    return (
        <Paper elevation={3} className="add-task-panel">
            <Stack direction={"row"} alignItems={"center"}>
                <AddSharpIcon sx={{ mr: 2 }} />
                <TextField
                    fullWidth
                    id="fullWidth"
                    label="Add New Task"
                    className="add-task-input"
                />
                <Button>
                    <Typography>Add</Typography>
                </Button>
            </Stack>
        </Paper>
    );
}