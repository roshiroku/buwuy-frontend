import { useMemo } from 'react';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import Input from './Input';

const Autocomplete = ({
  options: _options,
  value: _value,
  onChange,
  label,
  error,
  placeholder,
  multiple = false,
  slotProps: _slotProps = { chip: { size: 'small', color: 'primary' } },
  ...props
}) => {
  const slotProps = useMemo(() => ({
    ..._slotProps,
    chip: { size: 'small', color: 'primary', ..._slotProps.chip }
  }), [_slotProps]);

  const options = useMemo(() => _options, [JSON.stringify(_options)]);

  const value = useMemo(() => {
    if (multiple) {
      return options.length >= _value.length ? (
        _value.map((value) => options.find((opt) => opt.value === value))
      ) : [];
    } else {
      return options.find(({ value }) => value === _value);
    }
  }, [_value, options, multiple]);

  return (
    <MuiAutocomplete
      value={value}
      onChange={(e, value) => onChange(multiple ? value.map(({ value }) => value) : value?.value)}
      options={options}
      renderInput={(params) => <Input {...params} label={label} error={error} placeholder={placeholder} />}
      multiple={multiple}
      slotProps={slotProps}
      {...props}
    />
  );
};

export default Autocomplete;
