import { Container, Typography, Stack } from '@mui/material';

import AddTaskPanel from '../AddTaskPanel';

import './MainPanel.css';
import { isEmpty } from 'lodash';

export default function MainPanel({ isArchiveSelected, currentTaskListFilter })
{
    let title = "Archived Tasks";
    let description = "";  

    if (isArchiveSelected !== true)
    {
        title = currentTaskListFilter[0]?.title;
        description = currentTaskListFilter[0]?.description;
    }

    return (
        <Container class="main-panel">
            <Stack sx={{ mb: 3, pl: 3 }} direction={"row"} alignItems={"center"} gap={3}>
                <Typography className="title">{title}</Typography>
                <Typography className="description">{description}</Typography>
            </Stack>
            <AddTaskPanel />
        </Container>
    );
}
