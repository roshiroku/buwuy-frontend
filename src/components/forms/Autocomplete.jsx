import { useMemo } from 'react';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import Input from './Input';

const Autocomplete = ({
  options: _options,
  value: _value,
  onChange,
  label,
  error,
  multiple = false,
  slotProps = { chip: { size: 'small', color: 'primary' } },
  ...props
}) => {
  const options = useMemo(() => _options, [JSON.stringify(_options)]);

  const value = useMemo(() => {
    if (multiple) {
      return _value.map((value) => options.find((opt) => opt.value === value));
    } else {
      return options.find(({ value }) => value === _value) || '';
    }
  }, [_value, options, multiple]);

  return (
    <MuiAutocomplete
      value={value}
      onChange={(e, value) => onChange(multiple ? value.map(({ value }) => value) : value?.value)}
      options={options}
      renderInput={(params) => <Input {...params} label={label} error={error} />}
      multiple={multiple}
      slotProps={slotProps}
      {...props}
    />
  );
};

export default Autocomplete;
