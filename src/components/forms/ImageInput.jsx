import { useEffect, useState } from 'react';

const ImageInput = ({ value: _value, onChange, multiple }) => {
  const [value, setValue] = useState(_value);
  const [fileValue, setFileValue] = useState('');
  const [source, setSource] = useState(typeof _value === 'string' ? 'url' : 'upload');

  const handleSource = (e) => {
    if (e.target.checked) {
      setSource(e.target.value);
      onChange(null);
    }
  };

  const handleFile = (e) => {
    const { files, value } = e.target;
    setFileValue(value);
    onChange(multiple ? files : files[0]);
  };

  const handleUrl = (e) => {
    const { value } = e.target;
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (typeof _value === 'string') {
      setValue(_value);
      setFileValue('');
      setSource('url');
    } else {
      setValue('');
      setFileValue(_value ? fileValue : '');
      setSource(_value ? 'upload' : source);
    }
  }, [_value]);

  return (
    <div>
      <label>
        <input
          type="radio"
          value="upload"
          checked={source === 'upload'}
          onChange={handleSource}
        />
        file upload
      </label>
      <label>
        <input
          type="radio"
          value="url"
          checked={source === 'url'}
          onChange={handleSource}
        />
        web url
      </label>
      {source === 'upload' && (
        <input
          type="file"
          value={fileValue}
          accept="image/*"
          multiple={multiple}
          onChange={handleFile}
        />
      )}
      {source === 'url' && (
        <input type="text" value={value || ''} onChange={handleUrl} />
      )}
    </div>
  );
};

export default ImageInput;
