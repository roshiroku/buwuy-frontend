import { useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { remoteAsset } from '../../utils/url.utils';
import Input from './Input';

const ImageInput = ({ value, onChange }) => {
  const [source, setSource] = useState(value && typeof value === 'string' ? 'url' : 'upload');
  const [file, setFile] = useState(value instanceof File ? value : null);
  const [filePreview, setFilePreview] = useState('');
  const [urlValue, setUrlValue] = useState(value && typeof value === 'string' ? value : '');

  const handleFileUpload = (file) => {
    setFile(file);
    onChange(file);
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setUrlValue(value);
    onChange(value);
  };

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    setSource(newSource);
    if (newSource === 'upload') {
      onChange(file);
    } else if (newSource === 'url') {
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

  useEffect(() => {
    if (value && typeof value === 'string') {
      setSource('url');
      setUrlValue(value);
    }
  }, [value]);

  const previewImage = source === 'upload' ? filePreview : remoteAsset(urlValue);
  const isValidPreview = !!(previewImage && (source === 'url' ? urlValue : file));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl>
        <RadioGroup
          row
          value={source}
          onChange={handleSourceChange}
          sx={{ justifyContent: 'center', gap: 2 }}
        >
          <FormControlLabel value="upload" control={<Radio />} label="Upload File" />
          <FormControlLabel value="url" control={<Radio />} label="Image URL" />
        </RadioGroup>
      </FormControl>

      {source === 'upload' && (
        <Input type="file" label="Upload Image" accept="image/*" onChange={handleFileUpload} />
      )}

      {source === 'url' && (
        <Input label="Image URL" value={urlValue} onChange={handleUrlChange} fullWidth />
      )}

      <Box
        component="img"
        src={isValidPreview ? previewImage : 'https://placehold.co/150?text=No+Image'}
        alt="Preview"
        sx={{
          width: 150,
          height: 150,
          objectFit: 'cover',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}
      />

      {!isValidPreview && (
        <Typography variant="body2" color="text.medium" textAlign="center">
          No valid image selected.
        </Typography>
      )}
    </Box>
  );
};

export default ImageInput;
