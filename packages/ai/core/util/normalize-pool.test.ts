import { expect, it, describe } from 'vitest';
import { normalizeModelPool } from './normalize-pool';
import { MockLanguageModelV1 } from '../test/mock-language-model-v1';

describe('normalizeModelPool', () => {
  it('wraps a single model into an array and sets primaryModel', () => {
    const model = new MockLanguageModelV1();
    const { fallbackModels, primaryModel } = normalizeModelPool(model);

    expect(fallbackModels).toEqual([model]);
    expect(primaryModel).toBe(model);
  });

  it('returns the same array and first element as primaryModel', () => {
    const model = new MockLanguageModelV1();
    const models = [model];
    const { fallbackModels, primaryModel } = normalizeModelPool(models);

    expect(fallbackModels).toBe(models);
    expect(primaryModel).toBe(model);
  });
});
