import ModelService from './ModelService';
import useModelService from '../hooks/useModelService';

class TagService extends ModelService {
  constructor() {
    super('/api/tags');
  }
}

const tagService = new TagService();

export const { useTag, useTags } = useModelService(tagService, { name: 'tag' });

export default tagService;
