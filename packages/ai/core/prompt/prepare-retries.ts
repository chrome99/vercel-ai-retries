import { InvalidArgumentError } from '../../errors/invalid-argument-error';
import {
  RetryFunction,
  retryWithExponentialBackoff,
} from '../../util/retry-with-exponential-backoff';

/**
 * Validate and prepare retries.
 */
export function prepareRetries({
  maxRetries,
  initialDelayInMs,
  backoffFactor,
  retryOnError,
}: {
  maxRetries: number | undefined;
  initialDelayInMs: number | undefined;
  backoffFactor: number | undefined;
  retryOnError?: (error: unknown) => boolean;
}): {
  maxRetries: number;
  retry: RetryFunction;
} {
  if (initialDelayInMs != null) {
    if (!Number.isInteger(initialDelayInMs)) {
      throw new InvalidArgumentError({
        parameter: 'initialDelayInMs',
        value: initialDelayInMs,
        message: 'initialDelayInMs must be an integer',
      });
    }
    if (initialDelayInMs < 0) {
      throw new InvalidArgumentError({
        parameter: 'initialDelayInMs',
        value: initialDelayInMs,
        message: 'initialDelayInMs must be >= 0',
      });
    }
  }

  if (backoffFactor != null) {
    if (!Number.isInteger(backoffFactor)) {
      throw new InvalidArgumentError({
        parameter: 'backoffFactor',
        value: backoffFactor,
        message: 'backoffFactor must be an integer',
      });
    }
    if (backoffFactor < 1) {
      throw new InvalidArgumentError({
        parameter: 'backoffFactor',
        value: backoffFactor,
        message: 'backoffFactor must be >= 1',
      });
    }
  }

  if (retryOnError != null) {
    if (typeof retryOnError !== 'function') {
      throw new InvalidArgumentError({
        parameter: 'retryOnError',
        value: retryOnError,
        message: 'retryOnError must be a function',
      });
    }
    if (retryOnError.length !== 1) {
      throw new InvalidArgumentError({
        parameter: 'retryOnError',
        value: retryOnError,
        message: 'retryOnError must be a function with one argument',
      });
    }
  }

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
      initialDelayInMs,
      backoffFactor,
      retryOnError,
    }),
  };
}
