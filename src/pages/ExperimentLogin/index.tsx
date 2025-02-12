import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
} from '@mui/material';
import { GraduationCap, KeyRound, Calendar, Clock } from 'lucide-react';
import { useExperimentLogin } from '../../hooks/useExperimentLogin';
import { useCurrentExperiments } from '../../hooks/useExperiments';
import Notification from '../../components/common/Notification';
import { Experiment } from '../../types/experiment';

const ExperimentLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: experiments, isLoading } = useCurrentExperiments();
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    password: '',
    email: '',
    name: '',
    experiment_id: '',
  });
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const { mutate: login, isPending } = useExperimentLogin({
    onSuccess: () => {
      navigate('/topics');
    },
    onError: (error: any) => {
      setNotification({
        open: true,
        message: error.response?.data?.detail || 'Failed to login. Please try again.',
        severity: 'error',
      });
    },
  });

  useEffect(() => {
    if (experiments?.length && experiments.length > 0) {
      setSelectedExperiment(experiments[0]);
      setFormData(prev => ({ ...prev, experiment_id: experiments[0].id }));
    }
  }, [experiments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderExperimentDetails = () => {
    if (!selectedExperiment) return null;

    return (
      <Box sx={{ 
        mb: 4, 
        textAlign: 'left',
        p: 3,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h6" gutterBottom color="primary">
          {selectedExperiment.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {selectedExperiment.description}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <Calendar size={16} />
            <Typography variant="body2">
              Starts: {formatDate(selectedExperiment.start_date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <Clock size={16} />
            <Typography variant="body2">
              Ends: {formatDate(selectedExperiment.end_date)}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
          }}
        >
          <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={200} />
        </Paper>
      </Box>
    );
  }

  if (!experiments?.length) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
            textAlign: 'center',
          }}
        >
          <Alert severity="info">
            No active experiments available at the moment. Please contact your administrator.
          </Alert>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          textAlign: 'center',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
            : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <KeyRound size={32} strokeWidth={1.5} />
          <GraduationCap size={48} strokeWidth={1.5} style={{ marginLeft: -8 }} />
        </Box>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Experiment Access
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Enter your access code to participate in the experiment. You can get the code from your experiment administrator.
        </Typography>

        {experiments.length > 10 && ( // TODO: set to >1 when we need a way to select an experiment
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Experiment</InputLabel>
            <Select
              value={selectedExperiment?.id || ''}
              label="Select Experiment"
              onChange={(e) => {
                const experiment = experiments.find(exp => exp.id === e.target.value);
                setSelectedExperiment(experiment || null);
                setFormData(prev => ({ ...prev, experiment_id: e.target.value }));
              }}
            >
              {experiments.map((experiment) => (
                <MenuItem key={experiment.id} value={experiment.id}>
                  {experiment.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {renderExperimentDetails()}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Access Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
            fullWidth
            margin="normal"
            InputProps={{
              sx: { fontFamily: 'monospace' },
            }}
          />
          
          {selectedExperiment && !selectedExperiment.code_single_use && (
            <>
              <TextField
                label="Password (Optional)"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                margin="normal"
                helperText="Set a password if you want to access your experiment later"
              />
              <Alert severity="info" sx={{ mt: 2, mb: 3, textAlign: 'left' }}>
                If you don't set a password now, you won't be able to access your experiment progress later.
              </Alert>
            </>
          )}

          <TextField
            label="Email (Optional)"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Full Name (Optional)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isPending || !selectedExperiment}
            sx={{ mt: 3, mb: 2 }}
          >
            {isPending ? 'Logging in...' : 'Start Experiment'}
          </Button>

          <Typography variant="body2">
            Have an account?{' '}
            <Link href="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </form>
      </Paper>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
};

export default ExperimentLogin;