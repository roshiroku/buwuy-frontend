import React, { useMemo, useState } from 'react';

export const Input = ({ value: _value, placeholder, type, onChange, error }) => {
  const [value, setValue] = useState(_value);

  const handleInput = (e) => {
    setValue(e.target.value);
    onChange(e, type === 'file' ? e.target.files[0] : e.target.value);
  };

  return (
    <>
      <input type={type || 'text'} value={value} placeholder={placeholder} onInput={handleInput} />
      {error && <span>{error}</span>}
    </>
  );
};

export const SubmitButton = ({ children = 'Submit' }) => {
  return <button type="submit">{children}</button>;
};

const Form = ({ default: _default, schema, onChange, onSubmit, children: _children }) => {
  const [data, setData] = useState(_default ?? schema.empty());
  const [errors, setErrors] = useState({});

  const [submitButton, ...children] = useMemo(() => React.Children.toArray(_children)
    .reduce((children, child) => {
      const isSubmitButton = child.type.toString() === SubmitButton.toString();
      return isSubmitButton ? [child, ...children.slice(1)] : [...children, child];
    }, [<SubmitButton />]), [_children]);

  const handleReset = () => {
    setData(_default ?? schema.empty());
  };

  const handleChange = (name) => (e, value) => {
    const error = schema.validateField(name, value);
    if (name in errors) {
      setErrors({ ...errors, [name]: error });
    }
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = schema.validate(data);
    !errors && onSubmit && onSubmit(data);
    setErrors(errors || {});
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.items.map((field) => {
        const name = field.name;
        return (
          <Input
            key={name}
            value={data[name]}
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
