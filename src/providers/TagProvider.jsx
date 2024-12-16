import { createContext, useContext } from 'react';
import { useTags as useModels } from '../services/tag.service';

export const TagContext = createContext();

export const useTags = () => useContext(TagContext);

const TagProvider = ({ children }) => {
  const ctx = useModels();
  return (
    <TagContext.Provider value={ctx}>
      {children}
    </TagContext.Provider>
  );
};

export default TagProvider;
