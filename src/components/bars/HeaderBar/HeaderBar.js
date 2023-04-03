import AppsIcon from '@mui/icons-material/Apps';
import { Stack, Typography, Box } from '@mui/material';

import './HeaderBar.css';

/**
 * Renders a header bar with the app title and icon.
 *
 * @returns {JSX.Element} Header bar component.
 */
export default function HeaderBar() {
  return (
    <Box className='header-container'>
        <Stack className='app-title-stack' direction="row" alignItems="left" gap={2}>
            <AppsIcon />
            <Typography className='app-title' variant="body1">To Do</Typography>
        </Stack>
    </Box>
  );
}