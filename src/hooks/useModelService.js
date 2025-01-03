import { useMemo } from "react";
import useModel from "./useModel";
import useModels from "./useModels";
import { ucFirst } from "../utils/string.utils";

export default function useModelService(service, { name = 'model' }) {
  const [single, plural] = Array.isArray(name) ? name : [name, `${name}s`];
  const [Single, Plural] = [ucFirst(single), ucFirst(plural)];

  function renameProp(name) {
    return name
      .replace('models', plural)
      .replace('Models', Plural)
      .replace('model', single)
      .replace('Model', Single);
  }

  return {
    [`use${Single}Singleton`]: (input) => {
      const model = useModel(service, input, true);
      return useMemo(() => {
        const ctx = {};
        for (const k in model) {
          if (k.match(/model/i)) {
            ctx[renameProp(k)] = model[k];
          } else {
            ctx[k + Single] = model[k];
          }
        }
        return ctx;
      }, [model]);
    },
    [`use${Single}`]: (input) => {
      const model = useModel(service, input);
      return useMemo(() => {
        const ctx = {};
        for (const k in model) {
          if (k.match(/model/i)) {
            ctx[renameProp(k)] = model[k];
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
            ctx[renameProp(k)] = models[k];
          } else {
            ctx[k + Plural] = models[k];
          }
        }
        return ctx;
      }, [models]);
    }
  };
}
