import { createContext, useContext } from 'react';
import tagService from '../services/tag.service';
import { useModelContext } from '../hooks/useModelContext';

export const TagContext = createContext();

export const useTags = () => useContext(TagContext);

const TagProvider = ({ children }) => {
  const ctx = useModelContext(tagService, 'tag');

  return (
    <TagContext.Provider value={ctx}>
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;
