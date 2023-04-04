import { styled, Paper, Typography } from '@mui/material';
export default function NoTasksCard()
{
    const Text = styled(Typography)`
        font-weight: 200;
        color: var(--bg-brand);
    `;

    return (
        <Paper elevation={3} sx={{ p: 5 }}>
            <Text textAlign={"center"} variant='h3'>There are no tasks within this list.</Text>
        </Paper>
    );
}