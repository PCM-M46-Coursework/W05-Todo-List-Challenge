import
    {
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        Typography,
        Button,
    } from '@mui/material';
    
/**
 * Renders a confirmation dialog box with a message and buttons to confirm or cancel.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onCancel - The callback function to call when the cancel button is clicked.
 * @param {Function} props.onOk - The callback function to call when the ok button is clicked.
 * @param {boolean} [props.open=false] - Whether the dialog should be open or not.
 * @param {string} props.message - The message to display in the dialog.
 * @param {string} props.title - The title of the dialog.
 * @returns {JSX.Element} - The rendered component.
 */
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