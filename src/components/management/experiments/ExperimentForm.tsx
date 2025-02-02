import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Autocomplete,
  styled,
  CircularProgress,
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ExperimentFormData } from '../../../types/experiment';
import { useTopics } from '../../../hooks/topics';
import { TopicResponse } from '../../../types/topic';

const ResizableTextField = styled(TextField)({
  '& .MuiInputBase-inputMultiline': {
    resize: 'vertical',
    minHeight: '100px',
  },
});

interface ExperimentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ExperimentFormData) => void;
  initialData?: ExperimentFormData;
  title: string;
}

const ExperimentForm = ({ open, onClose, onSubmit, initialData, title }: ExperimentFormProps) => {
  const { data: availableTopics = [], isLoading } = useTopics();
  const [formData, setFormData] = useState<ExperimentFormData>({
    title: '',
    description: '',
    start_date: new Date().toISOString().slice(0, 16),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    topic_ids: [],
    is_active: true,
    code_single_use: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        start_date: initialData.start_date.slice(0, 16),
        end_date: initialData.end_date.slice(0, 16),
      });
    } else {
      setFormData({
        title: '',
        description: '',
        start_date: new Date().toISOString().slice(0, 16),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        topic_ids: [],
        is_active: true,
        code_single_use: true,
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    });
  };

  const selectedTopics = availableTopics?.filter(topic => formData.topic_ids.includes(topic.id)) || [];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'visible',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              fullWidth
            />
            <ResizableTextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              minRows={3}
              fullWidth
            />
            <TextField
              label="Start Date"
              type="datetime-local"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="datetime-local"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Autocomplete
              multiple
              options={availableTopics || []}
              getOptionLabel={(option: TopicResponse) => option.title}
              value={selectedTopics}
              onChange={(_, newValue) => {
                setFormData({
                  ...formData,
                  topic_ids: newValue.map(topic => topic.id),
                });
              }}
              loading={isLoading}
              loadingText="Loading topics..."
              componentsProps={{
                popper: {
                  sx: {
                    zIndex: 10000,
                  },
                },
                paper: {
                  sx: {
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    border: '1px solid',
                    borderColor: 'divider',
                    '.MuiAutocomplete-option': {
                      px: 2,
                      py: 1,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                      '&[aria-selected="true"]': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&.Mui-focused': {
                          bgcolor: 'primary.dark',
                        },
                      },
                      '&.Mui-focused': {
                        bgcolor: 'action.hover',
                      },
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Topics"
                  required
                  error={formData.topic_ids.length === 0}
                  helperText={formData.topic_ids.length === 0 ? "Please select at least one topic" : "Select one or more topics for this experiment"}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  inputProps={{
                    ...params.inputProps,
                    required: false,
                  }}
                />
              )}
              noOptionsText="No topics available"
              disablePortal={false}
              PaperComponent={({ children }) => (
                <Paper
                  elevation={8}
                  sx={{
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                  }}
                >
                  {children}
                </Paper>
              )}
              sx={{
                '& .MuiAutocomplete-tag': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiChip-deleteIcon': {
                    color: 'primary.contrastText',
                    '&:hover': {
                      color: 'primary.contrastText',
                    },
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                }
                label="Active"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.code_single_use}
                    onChange={(e) => setFormData({ ...formData, code_single_use: e.target.checked })}
                  />
                }
                label="Single-use Access Codes"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={formData.topic_ids.length === 0}
          >
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExperimentForm;