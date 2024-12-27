import { useCallback, useEffect, useMemo, useState } from 'react';
import { remoteAsset } from '../../utils/url.utils';
import ImageInput from './ImageInput';

const ImagesInput = ({ value: _value = [], onChange }) => {
  const [input, setInput] = useState(null);
  const [images, setImages] = useState(_value);

  const value = useMemo(() => images.map((image) => ({
    src: image.file || image.src,
    alt: image.alt
  })), [images]);

  const hasChanged = useMemo(() => {
    const [a, b] = [_value, value].map((value) => {
      return JSON.stringify(value.map(({ src, ...image }) => ({
        ...image,
        src: src instanceof File ?
          Object.getOwnPropertyNames(Object.getPrototypeOf(src)).map((name) => src[name]) :
          src
      })));
    });
    return a !== b;
  }, [_value, value]);

  const handleChange = useCallback((i, value) => {
    setImages((prev) => prev.map((image, j) => j === i ? value : image));
  }, []);

  const handleUpload = useCallback(async () => {
    const images = [];
    for (const file of [...input]) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      images.push({ file, src, alt: '' });
    }
    setImages((prev) => [...prev, ...images]);
  }, [input]);

  const handleMove = useCallback((i, to) => {
    setImages((prev) => {
      if (to < 0 || to > prev.length - 1) return prev;
      const [image] = prev.splice(i, 1);
      prev.splice(to, 0, image);
      return [...prev];
    });
  }, []);

  const handleRemove = useCallback((i) => {
    setImages((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const handleAdd = useCallback(async () => {
    if (!input) return;
    if (typeof input === 'string') {
      setImages((prev) => [...prev, { src: input, alt: '' }]);
    } else {
      await handleUpload();
    }
    setInput(null);
  }, [input]);

  useEffect(() => {
    if (hasChanged) setImages(_value);
  }, [_value]);

  useEffect(() => {
    if (hasChanged) onChange(value);
  }, [value]);

  return (
    <div>
      <div>
        <ImageInput value={input} onChange={setInput} multiple />
        <button type="button" onClick={handleAdd}>
          add
        </button>
      </div>
      <ul>
        {images.map((image, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center' }}>
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
            </div>
            <div>
              {i > 0 && (
                <button type="button" onClick={() => handleMove(i, i - 1)}>↑</button>
              )}
              {i < images.length - 1 && (
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
