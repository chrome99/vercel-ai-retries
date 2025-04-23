import {
  ImageModelV1,
  SpeechModelV1,
  TranscriptionModelV1,
} from '@ai-sdk/provider';
import { EmbeddingModel } from './embedding-model';
import { LanguageModel } from './language-model';

export type AllowedModels =
  | LanguageModel
  | ImageModelV1
  | EmbeddingModel<any>
  | SpeechModelV1
  | TranscriptionModelV1;

/**
A pool of fallback models of a specific allowed type.
Used internally after normalization.
*/
export type ModelPool<ModelType extends AllowedModels> = ModelType[];

/**
A single model or a pool of fallback models.
Used as user-facing input and normalized internally.
*/
export type ModelPoolInput<ModelType extends AllowedModels> =
  | ModelType
  | ModelPool<ModelType>;
