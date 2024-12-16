import { useState } from 'react';

const Input = ({ value, type, onChange }) => {
  return (
    <input value={value} onInput={(e) => onChange(e, e.target.value)} />
  );
};

const Form = ({ default: initialValue, schema, onChange, onSubmit }) => {
  const [formData, setFormData] = useState(initialValue ?? schema.empty());
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setFormData(initialValue ?? schema.empty());
  };

  const handleChange = (name) => (e, value) => {
    const error = schema.validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.items.map((field) => {
        const name = field.name;
        return (
          <Input
            key={name}
            value={formData[name]}
            onChange={handleChange(name)}
            error={errors[name]}
            {...field}
          />
        );
      })}
    </form>
  );
};

export default Form;
