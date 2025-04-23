import { InvalidArgumentError } from '../../errors/invalid-argument-error';
import {
  RetryFunction,
  retryWithExponentialBackoff,
} from '../../util/retry-with-exponential-backoff';
import { AllowedModels, ModelPool } from '../types/model-pool';

/**
 * Validate and prepare retries.
 */
export function prepareRetries<ModelType extends AllowedModels>({
  maxRetries,
  fallbackModels,
}: {
  maxRetries: number | undefined;
  fallbackModels: ModelPool<ModelType>;
}): {
  maxRetries: number;
  retry: RetryFunction<ModelType>;
} {
  if (maxRetries != null) {
    if (!Number.isInteger(maxRetries)) {
      throw new InvalidArgumentError({
        parameter: 'maxRetries',
        value: maxRetries,
        message: 'maxRetries must be an integer',
      });
    }

    if (maxRetries < 0) {
      throw new InvalidArgumentError({
        parameter: 'maxRetries',
        value: maxRetries,
        message: 'maxRetries must be >= 0',
      });
    }
  }

  const maxRetriesResult = maxRetries ?? 2;

  return {
    maxRetries: maxRetriesResult,
    retry: retryWithExponentialBackoff({
      maxRetries: maxRetriesResult,
      fallbackModels,
    }),
  };
}
