import { expect, it } from 'vitest';
import { prepareRetries } from './prepare-retries';
import { MockLanguageModelV1 } from '../test/mock-language-model-v1';

it('should set default values correctly when no input is provided', () => {
  const defaultResult = prepareRetries({
    maxRetries: undefined,
    fallbackModels: [new MockLanguageModelV1()],
  });
  expect(defaultResult.maxRetries).toBe(2);
});
