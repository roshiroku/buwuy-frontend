import { useState } from 'react';

export const FileInput = ({ value: _value, onChange, error }) => {
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    setValue(e.target.value);
    onChange(e.target.files[0]);
  };

  return (
    <>
      <input type='file' value={value} onInput={handleInput} />
      {error && <span>{error}</span>}
    </>
  );
};

export const TextInput = ({ type = 'text', value, placeholder, onChange, error }) => {
  // const [value, setValue] = useState(_value);

  const handleInput = (e) => {
    // setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <input type={type} value={value} placeholder={placeholder} onInput={handleInput} />
      {error && <span>{error}</span>}
    </>
  );
};

export const TextArea = ({ value, placeholder, onChange, error }) => {
  // const [value, setValue] = useState(_value);

  const handleInput = (e) => {
    // setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <textarea value={value} placeholder={placeholder} onInput={handleInput} />
      {error && <span>{error}</span>}
    </>
  );
};

const Input = ({ value, placeholder, type, onChange, error }) => {
  switch (type) {
    case 'file':
      return <FileInput {...{ value, onChange, error }} />;
    case 'text':
      return <TextArea {...{ value, placeholder, onChange, error }} />;
    default:
      return <TextInput {...{ type, value, placeholder, onChange, error }} />
  }
};

export default Input;
