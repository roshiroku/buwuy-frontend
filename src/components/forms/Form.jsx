import React, { useMemo, useState } from 'react';

export const Input = ({ value, placeholder, type, onChange, error }) => {
  return (
    <>
      <input value={value} placeholder={placeholder} onInput={(e) => onChange(e, e.target.value)} />
      {error && <span>{error}</span>}
    </>
  );
};

export const SubmitButton = ({ children = 'Submit' }) => {
  return <button type="submit">{children}</button>;
};

const Form = ({ default: _default, schema, onChange, onSubmit, children: _children }) => {
  const [formData, setFormData] = useState(_default ?? schema.empty());
  const [errors, setErrors] = useState({});

  const [submitButton, ...children] = useMemo(() => React.Children.toArray(_children)
    .reduce((children, child) => {
      const isSubmitButton = child.type.toString() === SubmitButton.toString();
      return isSubmitButton ? [child, ...children.slice(1)] : [...children, child];
    }, [<SubmitButton />]), [_children]);

  const handleReset = () => {
    setFormData(_default ?? schema.empty());
  };

  const handleChange = (name) => (e, value) => {
    const error = schema.validateField(name, value);
    if (name in errors) {
      setErrors({ ...errors, [name]: error });
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = schema.validate(formData);
    !errors && onSubmit && onSubmit(formData);
    setErrors(errors || {});
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.items.map((field) => {
        const name = field.name;
        return (
          <Input
            key={name}
            value={formData[name]}
            placeholder={field.label}
            onChange={handleChange(name)}
            error={errors[name]}
            {...field}
          />
        );
      })}
      {children}
      {submitButton}
    </form>
  );
};

export default Form;
