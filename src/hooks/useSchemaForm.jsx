import { useCallback, useEffect, useMemo, useState } from 'react';
import Input from '../components/forms/Input';

export default function useSchemaForm(schema, { default: _default, handleChange, handleSubmit } = {}) {
  const [values, setValues] = useState(_default ?? schema.empty());
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setValues(_default ?? schema.empty());
  };

  const onChange = useCallback((name) => (value) => {
    const error = schema.validateField(name, value);
    setErrors((prev) => name in prev ? { ...prev, [name]: error } : prev);
    setValues((prev) => ({ ...prev, [name]: value }));
  }, [schema]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const errors = schema.validate(values);
    !errors && handleSubmit && handleSubmit(values);
    setErrors(errors || {});
  }, [schema, values, handleSubmit]);

  const inputs = useMemo(() => {
    const inputs = {};
    schema.items.forEach((field) => {
      const name = field.name;
      inputs[name] = (
        <Input
          key={name}
          value={values[name]}
          placeholder={field.label}
          onChange={onChange(name)}
          error={errors[name]}
          fullWidth
          {...field}
        />
      );
    });
    return inputs;
  }, [schema, values, errors]);

  useEffect(() => {
    setValues(_default ?? schema.empty());
  }, [_default]);

  return useMemo(() => {
    const handlers = {};
    for (const name in schema.fields) {
      handlers[name] = onChange(name);
    }
    return { values, setValues, errors, handlers, onChange, onSubmit, inputs };
  }, [errors, onSubmit]);
};
