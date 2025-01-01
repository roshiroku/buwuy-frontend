import { useState } from 'react';
import { TextField } from '@mui/material';

export const FileInput = ({ value: _value, onChange, ...props }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.files[0]);
  };

  return (
    <TextField
      type="file"
      value={value}
      onChange={handleChange}
      fullWidth
      slotProps={{ inputLabel: { shrink: true } }}
      {...props}
    />
  );
};

const Input = ({
  type,
  value = '',
  onChange,
  label,
  error,
  validate,
  size = 'small',
  sx: _sx,
  ...props
}) => {
  const sx = {
    label: { color: 'text.medium' },
    fieldset: { borderRadius: 2, borderColor: 'background.cardBorder' },
    '& .MuiOutlinedInput-root:not(.Mui-focused):hover': { fieldset: { borderColor: 'text.faded' } },
    ..._sx
  };
  let el;

  switch (type) {
    case 'file':
      el = (
        <FileInput
          value={value}
          onChange={onChange}
          label={label}
          size={size}
          sx={sx}
        />
      );
      break;
    case 'text':
      el = (
        <TextField
          value={value}
          multiline
          onChange={(e) => onChange(e.target.value)}
          label={label}
          error={!!error}
          helperText={error}
          size={size}
          fullWidth
          sx={sx}
        />
      );
      break;
    case 'password':
    case 'email':
    case 'number':
    default:
      el = (
        <TextField
          value={value}
          type={type === 'string' ? 'text' : type}
          onChange={(e) => onChange(e.target.value)}
          label={label}
          error={!!error}
          helperText={error}
          size={size}
          fullWidth
          sx={sx}
        />
      );
  }

  return el;
};

export default Input;
