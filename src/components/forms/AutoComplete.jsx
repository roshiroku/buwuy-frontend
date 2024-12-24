const AutoComplete = ({ options, value, onChange, multiple = false }) => {
  return (
    <select value={value} onChange={onChange} multiple={multiple}>
      {options.map(([value, text]) => (
        <option key={value ?? text} value={value ?? text}>
          {text ?? value}
        </option>
      ))}
    </select>
  )
};

export default AutoComplete;
