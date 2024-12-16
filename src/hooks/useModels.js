import { useState, useEffect, useMemo, useCallback } from "react";

export default function useModels(service, config = {}, setConfig = undefined) {
  const [models, setModels] = useState([]);
  const [params, setParams] = useState(config);
  const [isLoading, setIsLoading] = useState(true);

  const _setParams = useMemo(() => setConfig || setParams, [setConfig]);

  const getModels = useCallback(async () => {
    try {
      setIsLoading(true);
      const models = await service.find(params);
      setModels(models);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    setParams(config);
  }, [config]);

  useEffect(() => {
    getModels();
  }, [params]);

  return useMemo(() => ({
    models,
    setModels,
    isLoading,
    setIsLoading,
    params: params,
    setParams: _setParams,
    skip: params.skip,
    setSkip: (skip) => _setParams({ ...params, skip }),
    limit: params.limit,
    setLimit: (limit) => _setParams({ ...params, limit }),
  }), [models, isLoading, params, _setParams]);
}
