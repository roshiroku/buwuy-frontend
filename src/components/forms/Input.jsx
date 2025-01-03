import { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';

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

const Input = ({ type, value = '', ...props }) => {
  const sx = {
    label: { color: 'text.medium' },
    fieldset: { borderRadius: 2, borderColor: 'background.cardBorder' },
    '& .MuiOutlinedInput-root:not(.Mui-focused):hover': { fieldset: { borderColor: 'text.faded' } },
    ...props.sx
  };

  const characterCountHelperText = props.max && ['text', 'string'].includes(type) ? (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="small" color="error.main" sx={{ flexGrow: 1 }}>{props.error}</Typography>
      <Typography variant="small" color="text.medium" sx={{ flexShrink: 0 }}>{`${value.length} / ${props.max}`}</Typography>
    </Box>
  ) : (
    props.error
  );

  const commonProps = {
    value,
    onChange: (e) => props.onChange(e.target.value),
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    focused: props.focused,
    label: props.label,
    error: !!props.error,
    helperText: props.error,
    fullWidth: props.fullWidth ?? true,
    size: props.size || 'small',
    sx,
    slotProps: props.slotProps
  };

  switch (type) {
    case 'file':
      return <FileInput {...commonProps} onChange={props.onChange} />;
    case 'text':
      return (
        <TextField
          {...commonProps}
          multiline
          minRows={props.minRows || 3}
          helperText={characterCountHelperText}
          slotProps={{
            input: { minLength: props.min, maxLength: props.max },
            formHelperText: { component: 'div' },
            ...(props.slotProps || {})
          }}
        />
      );
  }

  return <TextField {...commonProps} type={type === 'string' ? 'text' : type} />;
};

export default Input;
