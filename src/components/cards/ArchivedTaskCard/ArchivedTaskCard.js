import { Button, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';

import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function ArchivedTaskCard({ task, onRestoreClick, onDestroyClick})
{
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Stack direction={"row"} justifyContent={"space-between"} >
                <Stack>
                    <Typography variant='subtitle2'>{task.title}</Typography>
                    <Typography variant='caption'>{task.description}</Typography>
                </Stack>
                <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
                    <Button onClick={() => onRestoreClick(task)} variant="outlined">
                        <Tooltip title="Restore">
                            <UnarchiveOutlinedIcon/>
                        </Tooltip>
                    </Button>
                    <Button onClick={() => onDestroyClick(task)} variant="outlined">
                        <Tooltip title="Destroy">
                            <DeleteForeverOutlinedIcon />
                        </Tooltip>
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}