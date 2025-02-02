import { Dialog, DialogTitle, DialogContent, Box, Button, Typography, Grid, Paper, useTheme } from '@mui/material';
import { Printer } from 'lucide-react';

interface PrintableAccessCodesProps {
  open: boolean;
  onClose: () => void;
  experimentTitle: string;
  codes: Array<{
    code: string;
    is_used: boolean;
  }>;
}

const PrintableAccessCodes = ({ open, onClose, experimentTitle, codes }: PrintableAccessCodesProps) => {
  const theme = useTheme();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          '@media print': {
            boxShadow: 'none',
          },
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media print': { display: 'none' },
      }}>
        <Typography variant="h6">Print Access Codes</Typography>
        <Button
          startIcon={<Printer size={20} />}
          variant="contained"
          onClick={handlePrint}
        >
          Print
        </Button>
      </DialogTitle>
      <DialogContent>
        {/* Print Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {experimentTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Access Codes
          </Typography>
        </Box>

        {/* Grid of Code Cards */}
        <Grid container spacing={2}>
          {codes.filter(code => !code.is_used).map((code) => (
            <Grid item xs={12} sm={6} md={3} key={code.code}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: '1px dashed',
                  borderColor: 'divider',
                  textAlign: 'center',
                  '@media print': {
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Fira Code, Monaco, Consolas, monospace',
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    wordBreak: 'break-all',
                    // Use a font that clearly distinguishes between similar characters
                    // like O/0, I/l/1
                  }}
                >
                  {code.code}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Print Styles */}
        <style>
          {`
            @media print {
              @page {
                size: A4;
                margin: 1cm;
              }
              body * {
                visibility: hidden;
              }
              .MuiDialog-root * {
                visibility: visible;
              }
              .MuiDialog-root {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .MuiDialogTitle-root {
                display: none !important;
              }
              .MuiPaper-root {
                box-shadow: none !important;
              }
            }
          `}
        </style>
      </DialogContent>
    </Dialog>
  );
};

export default PrintableAccessCodes;