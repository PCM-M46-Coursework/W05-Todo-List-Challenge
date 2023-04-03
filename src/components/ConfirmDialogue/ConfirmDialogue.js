import
    {
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Typography,
        Button,
    } from '@mui/material';

export default function ConfirmDialogue({ onCancel, onOk, open = false, message, title })
{
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>                
                <Typography variant='subtitle2'>{title}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant='body1'>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>
                    <Typography variant='button'>Cancel</Typography>
                </Button>
                <Button onClick={onOk}>
                    <Typography variant='button'>OK</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}