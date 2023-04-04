import { Paper, Typography } from '@mui/material';
export default function TaskCard({ id })
{   
    const task = localStorage.tasks.find(t => t.id === id);

    return (
        <Paper elevation={3} sx={{ p: 5 }}>
            <Typography textAlign={"center"} variant='body1'>{task.title}</Typography>
        </Paper>
    );
}