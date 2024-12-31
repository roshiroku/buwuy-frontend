import { useState, useEffect, useMemo, useCallback } from 'react';

export default function useModel(service, input, singleton) {
  const [model, setModel] = useState(typeof input === 'object' ? input : null);
  const [isLoading, setIsLoading] = useState(!model && (singleton || input));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadModel = async (modelId) => {
    try {
      setIsLoading(true);
      const model = await service.get(modelId);
      setModel(model);
    } finally {
      setIsLoading(false);
    }
  };

  const saveModel = useCallback(async () => {
    if (!model) return;

    try {
      setIsSaving(true);
      const res = await service.save(model);
      setModel(res);
    } finally {
      setIsSaving(false);
    }
  }, [model]);

  const deleteModel = useCallback(async () => {
    if (!model) return;

    try {
      setIsDeleting(true);
      await service.delete(model._id);
      setModel(null);
    } finally {
      setIsDeleting(false);
    }
  }, [model]);

  useEffect(() => {
    if (typeof input === 'object') {
      setModel(input);
      setIsLoading(!input);
    } else {
      setModel(null);
      (singleton || input) && loadModel(input);
    }
  }, [input, singleton]);

  return useMemo(() => ({
    model,
    setModel,
    isLoading,
    setIsLoading,
    saveModel,
    isSaving,
    setIsSaving,
    deleteModel,
    isDeleting,
    setIsDeleting,
  }), [model, isLoading, isSaving, isDeleting]);
}
