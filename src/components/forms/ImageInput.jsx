import { useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import { remoteAsset } from '../../utils/url.utils';
import Input from './Input';

const ImageInput = ({ value, onChange, label, error }) => {
  const [source, setSource] = useState(value && typeof value === 'string' ? 'url' : 'upload');
  const [file, setFile] = useState(value instanceof File ? value : null);
  const [filePreview, setFilePreview] = useState('');
  const [urlValue, setUrlValue] = useState(value && typeof value === 'string' ? value : '');
  const [isFocused, setIsFocused] = useState(false);

  const handleFileUpload = (file) => {
    setFile(file);
    onChange(file);
  };

  const handleUrlChange = (value) => {
    setUrlValue(value);
    onChange(value);
  };

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    setSource(newSource);
    onChange(newSource === 'upload' ? file : urlValue);
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
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', p: '14px' }}>
      <Input
        label={label}
        value=" "
        error={error}
        focused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          position: 'absolute',
          inset: 0,
          '& .MuiInputBase-root': { height: '100%', cursor: 'unset' },
          input: { pointerEvents: 'none', userSelect: 'none', opacity: 0 }
        }}
        slotProps={{ input: { readOnly: true } }}
      />
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
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
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <RadioGroup
              row
              value={source}
              onChange={handleSourceChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              sx={{ justifyContent: 'flex-start', gap: 2 }}
            >
              <FormControlLabel value="upload" control={<Radio />} label="Upload" />
              <FormControlLabel value="url" control={<Radio />} label="URL" />
            </RadioGroup>
          </FormControl>

          {source === 'upload' && (
            <Button
              variant="outlined"
              component="label"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              sx={{ borderRadius: 2 }}
            >
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
            </Button>
          )}

          {source === 'url' && (
            <Input
              label="Image URL"
              value={urlValue}
              onChange={handleUrlChange}
              fullWidth
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageInput;
