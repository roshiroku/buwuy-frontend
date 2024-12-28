import { useEffect, useState } from 'react';
import { remoteAsset } from '../../utils/url.utils';

const ImageInput = ({ value, onChange }) => {
  const [source, setSource] = useState(value && typeof value === 'string' ? 'url' : 'upload');
  const [file, setFile] = useState(value instanceof File ? value : null);
  const [fileValue, setFileValue] = useState('');
  const [filePreview, setFilePreview] = useState('');
  const [urlValue, setUrlValue] = useState(value && typeof value === 'string' ? value : '');

  const handleFileUpload = (e) => {
    const { value, files } = e.target;
    setFileValue(value);
    setFile(files[0]);
    onChange(files[0]);
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setUrlValue(value);
    onChange(value);
  };

  const handleSource = (e) => {
    const { value, checked } = e.target;
    if (!checked) return;
    if (value === 'upload') {
      setSource('upload');
      onChange(file);
    } else if (value === 'url') {
      setSource('url');
      onChange(urlValue);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview('');
    }
  }, [file]);

  return (
    <div>
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
        <input
          type="file"
          value={fileValue}
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: source === 'url' ? 'none' : '' }}
        />
        {source === 'url' && (
          <input type="text" value={urlValue} onChange={handleUrlChange} />
        )}
      </div>
      <img src={source === 'upload' ? filePreview : remoteAsset(urlValue)} alt="preview" style={{
        width: '150px',
        aspectRatio: 1,
        objectFit: 'cover'
      }} />
    </div>
  );
};

export default ImageInput;
