import AppsIcon from '@mui/icons-material/Apps';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import './HeaderBar.css';

export default function HeaderBar() {
  return (
    <header className='header-container'>
        <Stack className='app-title-stack' direction="row" alignItems="left" gap={2}>
            <AppsIcon />
            <Typography className='app-title' variant="body1">To Do</Typography>
        </Stack>
        <div></div>
    </header>
  );
}