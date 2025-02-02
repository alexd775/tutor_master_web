import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  FormControlLabel,
  Switch,
  useTheme,
} from '@mui/material';
import { Plus, Edit2, Trash2, Key } from 'lucide-react';
import { useExperiments, useExperimentManagement } from '../../../hooks/useExperiments';
import ExperimentForm from './ExperimentForm';
import AccessCodesDialog from './AccessCodesDialog';
import { Experiment, ExperimentFormData } from '../../../types/experiment';
import Notification from '../../common/Notification';

const ExperimentsManagement = () => {
  const theme = useTheme();
  const [showExpired, setShowExpired] = useState(false);
  const { data: experimentsData, isLoading } = useExperiments(showExpired);
  const { createExperiment, updateExperiment, deleteExperiment } = useExperimentManagement();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editExperiment, setEditExperiment] = useState<Experiment | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const showNotification = (message: string, severity: 'success' | 'error') => {
    setNotification({ open: true, message, severity });
  };

  const handleCreate = async (data: ExperimentFormData) => {
    try {
      await createExperiment.mutateAsync(data);
      setIsCreateOpen(false);
      showNotification('Experiment created successfully', 'success');
    } catch (error) {
      showNotification('Failed to create experiment', 'error');
    }
  };

  const handleUpdate = async (data: ExperimentFormData) => {
    if (editExperiment) {
      try {
        await updateExperiment.mutateAsync({ ...data, id: editExperiment.id });
        setEditExperiment(null);
        showNotification('Experiment updated successfully', 'success');
      } catch (error) {
        showNotification('Failed to update experiment', 'error');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experiment?')) {
      try {
        await deleteExperiment.mutateAsync(id);
        showNotification('Experiment deleted successfully', 'success');
      } catch (error) {
        showNotification('Failed to delete experiment', 'error');
      }
    }
  };

  const isExpired = (experiment: Experiment) => {
    return new Date(experiment.end_date) < new Date();
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h5" color="text.primary">
          Experiments
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={showExpired}
                onChange={(e) => setShowExpired(e.target.checked)}
              />
            }
            label="Show expired"
          />
          <Button
            startIcon={<Plus size={20} />}
            variant="contained"
            onClick={() => setIsCreateOpen(true)}
          >
            Create Experiment
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {experimentsData?.items.map((experiment) => {
          const expired = isExpired(experiment);
          return (
            <Grid item xs={12} sm={6} md={4} key={experiment.id}>
              <Card sx={{
                background: !experiment.is_active
                  ? theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #1f1f1f 0%, #0f0f0f 100%)'
                    : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
                  : expired
                    ? theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                      : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                    : theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                      : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
                opacity: !experiment.is_active ? 0.8 : 1,
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                          fontStyle: expired ? 'italic' : 'normal',
                          opacity: expired ? 0.7 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {experiment.title}
                        {!experiment.is_active && (
                          <Typography
                            variant="caption"
                            sx={{
                              bgcolor: 'error.main',
                              color: 'error.contrastText',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.7rem',
                            }}
                          >
                            INACTIVE
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {!expired && (
                        <IconButton
                          size="small"
                          onClick={() => setSelectedExperiment(experiment)}
                          sx={{
                            bgcolor: theme.palette.info.main,
                            color: 'white',
                            '&:hover': { bgcolor: theme.palette.info.dark },
                          }}
                        >
                          <Key size={16} />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        onClick={() => setEditExperiment(experiment)}
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: 'white',
                          '&:hover': { bgcolor: theme.palette.primary.dark },
                        }}
                      >
                        <Edit2 size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(experiment.id)}
                        sx={{
                          bgcolor: theme.palette.error.main,
                          color: 'white',
                          '&:hover': { bgcolor: theme.palette.error.dark },
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      opacity: expired ? 0.7 : 1,
                    }}
                  >
                    {experiment.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.secondary' }}>
                    <Typography variant="body2">
                      Start: {new Date(experiment.start_date).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      End: {new Date(experiment.end_date).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Topics: {experiment.topic_ids.length}
                    </Typography>
                    <Typography variant="body2">
                      Usage: {experiment.used_codes}/{experiment.total_codes} codes
                    </Typography>
                    <Typography variant="body2">
                      Code Type: {experiment.code_single_use ? 'Single-use' : 'Reusable'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <ExperimentForm
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        title="Create New Experiment"
      />

      {editExperiment && (
        <ExperimentForm
          open={!!editExperiment}
          onClose={() => setEditExperiment(null)}
          onSubmit={handleUpdate}
          initialData={{
            title: editExperiment.title,
            description: editExperiment.description,
            start_date: editExperiment.start_date,
            end_date: editExperiment.end_date,
            topic_ids: editExperiment.topic_ids,
            is_active: editExperiment.is_active,
            code_single_use: editExperiment.code_single_use,
          }}
          title="Edit Experiment"
        />
      )}

      {selectedExperiment && (
        <AccessCodesDialog
          open={!!selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
          experimentId={selectedExperiment.id}
          experimentTitle={selectedExperiment.title}
        />
      )}

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
};

export default ExperimentsManagement;