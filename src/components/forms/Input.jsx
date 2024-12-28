import { useState } from 'react';

export const FileInput = ({ value: _value, onChange }) => {
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    setValue(e.target.value);
    onChange(e.target.files[0]);
  };

  return <input type='file' value={value} onInput={handleInput} />;
};

const Input = ({
  type,
  onChange,
  error,
  validate,
  ...props
}) => {
  let el;

  switch (type) {
    case 'file':
      el = <FileInput onChange={onChange} {...props} />;
      break;
    case 'text':
      el = <textarea onInput={(e) => onChange(e.target.value)} {...props} />;
      break;
    default:
      el = <input type={type} onInput={(e) => onChange(e.target.value)} {...props} />;
  }

  return (
    <>
      {el}
      {error && <span>{error}</span>}
    </>
  )
};

export default Input;
