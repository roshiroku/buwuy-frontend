import { useEffect, useMemo, useState } from 'react';
import { remoteAsset } from '../../utils/url.utils';

const ImagesInput = ({ values: _values = [], onChange, files }) => {
  const [fileInput, setFileInput] = useState('');
  const [values, setValues] = useState(_values);

  const images = useMemo(() => {
    return values.map(({ file, src, alt, description }) => ({ src: file ? '' : src, alt, description }));
  }, [values]);

  const handleChange = (i, value) => {
    setValues(values.map((image, j) => j === i ? value : image));
  };

  const handleUpload = async (files) => {
    const images = [];
    for (const file of [...files]) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      images.push({ file, src });
    }
    setValues([...values, ...images.map(({ file, src }) => ({ file, src, alt: '', description: '' }))]);
    setFileInput('');
  };

  const handleMove = (i, to) => {
    if (to < 0 || to > values.length - 1) return;
    const [image] = values.splice(i, 1);
    values.splice(to, 0, image);
    setValues([...values]);
  };

  const handleRemove = (i) => {
    setValues(values.filter((_, j) => j !== i));
  };

  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(_values)) {
      setValues(_values);
    }
  }, [_values]);

  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(_values)) {
      onChange(images);
    }
    files.current = [];
    for (const { file } of values) {
      file && files.current.push(file);
    }
  }, [images]);

  return (
    <div>
      <input type="file" value={fileInput} accept="image/*" multiple onChange={(e) => handleUpload(e.target.files)} />
      <ul>
        {values.map((image, i) => (
          <li key={`${image.file?.name || image.src}_${i}`} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={remoteAsset(image.src)} alt={image.alt} style={{
              width: '150px',
              aspectRatio: 1,
              objectFit: 'cover'
            }} />
            <div>
              <input
                type="text"
                value={image.file?.name || image.src}
                onInput={(e) => handleChange(i, { ...image, src: image.file ? '' : e.target.value })}
                disabled={!!image.file}
              />
              <input
                type="text"
                value={image.alt}
                placeholder="alt"
                onInput={(e) => handleChange(i, { ...image, alt: e.target.value })}
              />
              <input
                type="text"
                value={image.description}
                placeholder="description"
                onInput={(e) => handleChange(i, { ...image, description: e.target.value })}
              />
            </div>
            <div>
              {i > 0 && (
                <button type="button" onClick={() => handleMove(i, i - 1)}>↑</button>
              )}
              {i < values.length - 1 && (
                <button type="button" onClick={() => handleMove(i, i + 1)}>↓</button>
              )}
              <button type="button" onClick={() => handleRemove(i)}>remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default ImagesInput;
