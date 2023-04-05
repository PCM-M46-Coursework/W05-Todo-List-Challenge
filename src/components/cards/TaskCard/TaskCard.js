import { Button, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useReadLocalStorage } from 'usehooks-ts';

import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default function TaskCard({ id, onArchiveClick, onEditClick})
{
    const tasks = useReadLocalStorage("tasks");
    const task = tasks.find(t => t.id === id);

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Stack direction={"row"} justifyContent={"space-between"} >
                <Stack>
                    <Typography variant='subtitle2'>{task.title}</Typography>
                    <Typography variant='caption'>{task.description}</Typography>
                </Stack>
                <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
                    <Button onClick={() => onEditClick(task)} variant="outlined">
                        <Tooltip title="Edit">
                            <ModeEditOutlinedIcon/>
                        </Tooltip>
                    </Button>
                    <Button onClick={() => onArchiveClick(task)} variant="outlined">
                        <Tooltip title="Archive">
                            <ArchiveOutlinedIcon />
                        </Tooltip>
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}