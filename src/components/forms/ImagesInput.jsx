import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, List, ListItem, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Input from './Input';
import { remoteAsset } from '../../utils/url.utils';

const SortableListItem = ({ id, children, handle }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes}>
      {handle && (
        <IconButton {...listeners} sx={{ cursor: 'grab', mr: 2 }}>
          <DragIndicatorIcon />
        </IconButton>
      )}
      {children}
    </ListItem>
  );
};

const ImagesInput = ({ value: _value = [], onChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState(_value);

  const imageId = useCallback(({ file, src }) => file?.name || src, []);

  const value = useMemo(() => images.map((image) => ({
    src: image.file || image.src,
    alt: image.alt
  })), [images]);

  const hasChanged = useMemo(() => {
    const [a, b] = [_value, value].map((value) => {
      return JSON.stringify(value.map(({ src, ...image }) => ({
        ...image,
        src: src instanceof File ? Object.getOwnPropertyNames(Object.getPrototypeOf(src)).map((name) => src[name]) : src
      })));
    });
    return a !== b;
  }, [_value, value]);

  const handleChange = useCallback((i, newValue) => {
    setImages((prev) => prev.map((image, j) => j === i ? newValue : image));
  }, []);

  const handleUpload = useCallback(async (files) => {
    const newImages = [];
    for (const file of [...files]) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
      newImages.push({ file, src, alt: '' });
    }
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleRemove = useCallback((i) => {
    setImages((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const addImageUrl = useCallback(() => {
    if (!imageUrl) return;
    setImages((prev) => [...prev, { src: imageUrl, alt: '' }]);
    setImageUrl('');
  }, [imageUrl]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((image) => imageId(image) === active.id);
      const newIndex = images.findIndex((image) => imageId(image) === over.id);
      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  }, [images]);

  useEffect(() => {
    if (hasChanged) setImages(_value);
  }, [_value]);

  useEffect(() => {
    if (hasChanged) onChange(value);
  }, [value]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          size="small"
          sx={{ flexShrink: 0, borderRadius: 2 }}
        >
          Upload Images
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
          />
        </Button>
        <Input label="Image URL" value={imageUrl} onChange={setImageUrl} fullWidth />
        <Button variant="contained" onClick={addImageUrl} size="small" sx={{ borderRadius: 2 }}>
          Add
        </Button>
      </Box>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => imageId(image))} strategy={verticalListSortingStrategy}>
          <List>
            {images.map((image, i) => (
              <SortableListItem key={imageId(image)} id={imageId(image)} handle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Avatar
                    variant="square"
                    src={remoteAsset(image.src)}
                    alt={image.alt}
                    sx={{ width: 92, height: 92, objectFit: 'cover' }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                    <Input
                      label="Image Source"
                      value={imageId(image)}
                      onChange={(value) => handleChange(i, { ...image, src: image.file ? '' : value })}
                      disabled={!!image.file}
                      fullWidth
                    />
                    <Input
                      label="Alt Text"
                      value={image.alt}
                      onChange={(value) => handleChange(i, { ...image, alt: value })}
                      fullWidth
                    />
                  </Box>
                  <IconButton color="error" onClick={() => handleRemove(i)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </SortableListItem>
            ))}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default ImagesInput;
