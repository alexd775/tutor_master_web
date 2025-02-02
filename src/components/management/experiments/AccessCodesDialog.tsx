import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
  useTheme,
} from '@mui/material';
import { Plus, Printer } from 'lucide-react';
import { useExperimentCodes, useExperimentCodeManagement } from '../../../hooks/useExperimentCodes';
import PrintableAccessCodes from './PrintableAccessCodes';
import Notification from '../../common/Notification';

interface AccessCodesDialogProps {
  open: boolean;
  onClose: () => void;
  experimentId: string;
  experimentTitle: string;
}

const AccessCodesDialog = ({ open, onClose, experimentId, experimentTitle }: AccessCodesDialogProps) => {
  const theme = useTheme();
  const [showUsed, setShowUsed] = useState(true);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const { data: codesData, isLoading } = useExperimentCodes(experimentId, showUsed);
  const { generateCodes } = useExperimentCodeManagement(experimentId);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleGenerateCodes = async () => {
    try {
      await generateCodes.mutateAsync(10);
      setNotification({
        open: true,
        message: 'Successfully generated new access codes',
        severity: 'success',
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to generate access codes',
        severity: 'error',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxHeight: '80vh',
          },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <Typography variant="h6">Access Codes - {experimentTitle}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<Printer size={20} />}
              variant="outlined"
              onClick={() => setIsPrintDialogOpen(true)}
              disabled={!codesData?.items.length}
            >
              Print Codes
            </Button>
            <Button
              startIcon={<Plus size={20} />}
              variant="contained"
              onClick={handleGenerateCodes}
              disabled={generateCodes.isPending}
            >
              Generate Codes
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showUsed}
                  onChange={(e) => setShowUsed(e.target.checked)}
                />
              }
              label="Show used codes"
            />
            <Typography variant="body2" color="text.secondary">
              Total: {codesData?.total || 0} codes ({codesData?.items.filter(code => code.is_used).length || 0} used)
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Used By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">Loading...</TableCell>
                  </TableRow>
                ) : !codesData?.items.length ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No codes available</TableCell>
                  </TableRow>
                ) : (
                  codesData.items.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ 
                            fontFamily: 'monospace',
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            p: 1,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          {code.code}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: code.is_used ? 'text.secondary' : 'success.main',
                            fontWeight: code.is_used ? 'normal' : 'medium'
                          }}
                        >
                          {code.is_used ? 'Used' : 'Available'}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatDate(code.created_at)}</TableCell>
                      <TableCell>{code.used_by_id || '-'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      <PrintableAccessCodes
        open={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
        experimentTitle={experimentTitle}
        codes={codesData?.items || []}
      />

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </>
  );
};

export default AccessCodesDialog;