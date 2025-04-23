import { AllowedModels, ModelPool, ModelPoolInput } from '../types/model-pool';

export function normalizeModelPool<Model extends AllowedModels>(
  input: ModelPoolInput<Model>,
): {
  fallbackModels: ModelPool<Model>;
  primaryModel: Model;
} {
  const fallbackModels = Array.isArray(input) ? input : [input];
  return {
    fallbackModels,
    primaryModel: fallbackModels[0],
  };
}
