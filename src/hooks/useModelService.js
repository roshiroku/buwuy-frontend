import { useMemo } from "react";
import useModel from "./useModel";
import useModels from "./useModels";
import { ucFirst } from "../utils/string.utils";

export default function useModelService(service, { name = 'model' }) {
  const [single, plural] = Array.isArray(name) ? name : [name, `${name}s`];
  const [Single, Plural] = [ucFirst(single), ucFirst(plural)];

  return {
    [`use${Single}`]: (input) => {
      const model = useModel(service, input);
      return useMemo(() => {
        const ctx = {};
        for (const k in model) {
          if (k.match(/model/i)) {
            ctx[k.replace('model', single).replace('Model', Single)] = model[k];
          } else {
            ctx[k + Single] = model[k];
          }
        }
        return ctx;
      }, [model]);
    },
    [`use${Plural}`]: (config, setConfig) => {
      const models = useModels(service, config, setConfig);
      return useMemo(() => {
        const ctx = {};
        for (const k in models) {
          if (k.match(/model/i)) {
            ctx[k.replace('models', plural).replace('Models', Plural)] = models[k];
          } else {
            ctx[k + Plural] = models[k];
          }
        }
        return ctx;
      }, [models]);
    }
  };
}
