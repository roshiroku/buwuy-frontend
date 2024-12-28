import { useCallback, useEffect, useMemo, useState } from 'react';
import { remoteAsset } from '../../utils/url.utils';

const ImagesInput = ({ value: _value = [], onChange }) => {
  const [imageUrl, setImageUrl] = useState('');
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

  const handleUpload = useCallback(async (files) => {
    const images = [];
    for (const file of [...files]) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      images.push({ file, src, alt: '' });
    }
    setImages((prev) => [...prev, ...images]);
  }, []);

  const handleMove = useCallback((i, to) => {
    if (to < 0 || to > images.length - 1) return;
    const [image] = images.splice(i, 1);
    images.splice(to, 0, image);
    setImages([...images]);
  }, [images]);

  const handleRemove = useCallback((i) => {
    setImages((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const addImageUrl = useCallback(async () => {
    if (!imageUrl) return;
    setImages((prev) => [...prev, { src: imageUrl, alt: '' }]);
    setImageUrl('');
  }, [imageUrl]);

  useEffect(() => {
    if (hasChanged) setImages(_value);
  }, [_value]);

  useEffect(() => {
    if (hasChanged) onChange(value);
  }, [value]);

  return (
    <div>
      <div>
        <input type="file" value={''} onChange={(e) => handleUpload(e.target.files)} accept="image/*" multiple />
      </div>
      <div>
        <input type="text" value={imageUrl} onInput={(e) => setImageUrl(e.target.value)} />
        <button type="button" onClick={addImageUrl}>
          add
        </button>
      </div>
      <ul>
        {images.map((image, i) => (
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
