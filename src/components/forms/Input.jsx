import { useMemo, useState } from 'react';
import { TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

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

export const EnumInput = ({ value, onChange, options: _options = [], label, helperText, ...props }) => {
  const options = useMemo(() => {
    if (Array.isArray(_options)) {
      return _options.map((option) => {
        const [value, label] = Array.isArray(option) ? option : [option, option];
        return { value, label };
      });
    } if (typeof _options === 'object') {
      return Object.entries(_options).map(([value, label]) => ({ value, label }));
    }
  }, [_options]);

  return (
    <FormControl {...props}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select value={value} onChange={onChange} displayEmpty label={label}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={props.error}>{helperText}</FormHelperText>}
    </FormControl>
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
    onChange: (e) => props.onChange && props.onChange(e.target.value),
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    focused: props.focused,
    label: props.label,
    error: !!props.error,
    helperText: props.error,
    fullWidth: props.fullWidth ?? true,
    size: props.size || 'small',
    sx,
    disabled: props.disabled,
    id: props.id
  };

  const textFieldProps = {
    slotProps: props.slotProps,
    InputLabelProps: props.InputLabelProps,
    InputProps: props.InputProps,
    inputProps: props.inputProps
  };

  switch (type) {
    case 'file':
      return <FileInput {...commonProps} onChange={props.onChange} />;
    case 'enum':
      return <EnumInput {...commonProps} options={props.options} />;
    case 'text':
      return (
        <TextField
          {...commonProps}
          {...textFieldProps}
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

  return <TextField {...commonProps} {...textFieldProps} type={type === 'string' ? 'text' : type} />;
};

export default Input;
