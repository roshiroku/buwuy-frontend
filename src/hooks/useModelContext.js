import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ucFirst } from '../utils/string.utils';

export function useModelContext(service, name = 'model', param = undefined) {
  name = typeof name === 'string' ? { single: name, plural: `${name}s` } : name;
  param = param === true ? `${name}Id` : param;

  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [models, setModels] = useState([]);

  const { [param]: modelId } = useParams();

  const map = useMemo(() => Object.entries(models.map((m) => [m._id, m])), [models]);
  const model = useMemo(() => map[modelId] || null, [map[modelId]]);

  const loadModels = async () => {
    try {
      setIsLoading(true);
      setModels(await service.all());
    } finally {
      setIsLoading(false);
    }
  };

  const saveModel = async (model) => {
    const isNew = !model._id;
    const saved = await service.save(model);

    if (isNew) {
      setModels([...models, saved]);
    } else {
      setModels(models.map((m) => m._id === saved._id ? saved : m));
    }
  };

  const deleteModel = async (modelId) => {
    await service.delete(modelId);
    setModels(models.filter((m) => m._id !== modelId));
  };

  useEffect(() => {
    if (!initialized) {
      loadModels();
      setInitialized(true);
    }
  }, []);

  return useMemo(() => ({
    isLoading,
    [name.single]: model,
    [name.plural]: models,
    [`${name.single}Map`]: map,
    [`save${ucFirst(name.single)}`]: saveModel,
    [`delete${ucFirst(name.single)}`]: deleteModel,
  }), [models, isLoading]);
}
