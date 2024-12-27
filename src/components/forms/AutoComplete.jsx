import { useRef } from 'react';

const AutoComplete = ({ options, value, onChange, multiple = false }) => {
  const optionElements = useRef([]);

  const handleChange = (e) => {
    if (multiple) {
      const values = [];
      optionElements.current.forEach(({ selected, value }) => selected && values.push(value));
      onChange(values);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <select value={value} onChange={handleChange} multiple={multiple}>
      {options.map(([value, text], i) => (
        <option key={value ?? text} value={value ?? text} ref={el => optionElements.current[i] = el}>
          {text ?? value}
        </option>
      ))}
    </select>
  )
};

export default AutoComplete;
