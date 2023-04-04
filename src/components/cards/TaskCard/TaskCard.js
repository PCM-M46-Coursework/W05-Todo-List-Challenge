import { Paper, Typography } from '@mui/material';
import { useReadLocalStorage } from 'usehooks-ts';

export default function TaskCard({ id })
{   
    const tasks = useReadLocalStorage("tasks");
    const task = tasks.find(t => t.id === id);

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='body1'>{task.title}</Typography>
        </Paper>
    );
}