import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from '@mui/material';
  
  interface ExpirationDialogProps {
    open: boolean;
    onClose: () => void;
  }
  
  const ExpirationDialog = ({ open, onClose }: ExpirationDialogProps) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Session Expired</DialogTitle>
        <DialogContent>
          <Typography>
            {/* Thank you for participating! Your session time has expired.
            You can start a new topic to continue learning. */}
            Du er nu færdig med denne del af eksperimentet. 
            Det er tid til et par minutters pause, før du fortsætter med posttest - tag en småkage!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ExpirationDialog