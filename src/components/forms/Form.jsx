import React, { useMemo, useState } from 'react';
import Input from './Input';

export const SubmitButton = ({ children = 'Submit' }) => {
  return <button type="submit">{children}</button>;
};

const Form = ({ default: _default, schema, onChange, onSubmit, children: _children }) => {
  const [data, setData] = useState(_default ?? schema.empty());
  const [errors, setErrors] = useState({});

  const { children, submitButton, customInputs } = useFormChildren(_children);

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
        const customInput = customInputs[name];
        return (
          customInput ? customInput(data[name], handleChange(name)) : (
            <Input
              key={name}
              value={data[name]}
              placeholder={field.label}
              onChange={handleChange(name)}
              error={errors[name]}
              {...field}
            />
          ));
      })}
      {children}
      {submitButton}
    </form>
  );
};

function useFormChildren(input) {
  return useMemo(() => {
    input = Array.isArray(input) ? input : [input];
    const { children, submitButton, customInputs = {} } =
      input.reduce((res, child) => {
        if (typeof child === 'function') {
          res.customInputs[child().key] = child;
        } if (child?.type === SubmitButton) {
          res.submitButton = child;
        } else if (child) {
          res.children.push(React.Children.toArray(child));
        }
        return res;
      }, { children: [], submitButton: <SubmitButton />, customInputs: {} });
    return { children, submitButton, customInputs };
  }, [input]);
}

export default Form;
