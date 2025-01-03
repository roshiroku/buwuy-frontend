import { useState, useEffect, useMemo, useCallback } from "react";

export default function useModels(service, config = {}, setConfig = undefined) {
  const [models, setModels] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState(config);
  const [isLoading, setIsLoading] = useState(true);

  const _setParams = useMemo(() => setConfig || setParams, [setConfig]);

  const modelById = useMemo(() => models.reduce((modelById, model) => {
    modelById[model._id] = model;
    return modelById;
  }, {}), [models]);

  const getModel = useCallback((id) => modelById[id], [modelById]);

  const getModels = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await service.find(params);
      const [models, count] = Array.isArray(res) ? [res, res.length] : [res.results, res.count];
      setModels(models);
      setCount(count);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    setParams(config);
  }, Object.values(config));

  useEffect(() => {
    getModels();
  }, [params]);

  return useMemo(() => ({
    models,
    setModels,
    getModels,
    modelById,
    getModel,
    isLoading,
    setIsLoading,
    count,
    setCount,
    params: params,
    setParams: _setParams,
    skip: params.skip,
    setSkip: (skip) => _setParams({ ...params, skip }),
    limit: params.limit,
    setLimit: (limit) => _setParams({ ...params, limit }),
  }), [models, count, isLoading, params, _setParams]);
}
