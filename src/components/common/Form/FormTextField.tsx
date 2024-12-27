import { TextField, TextFieldProps } from '@mui/material';

const FormTextField = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default FormTextField;