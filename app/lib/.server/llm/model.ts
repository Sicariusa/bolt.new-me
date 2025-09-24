import { DEFAULT_MODEL } from '~/config';
import { getModelFromId, type ModelID } from './models';

export function getModel(env: Env, modelId?: string) {
  const id = (modelId as ModelID | undefined) || (DEFAULT_MODEL as ModelID);
  return getModelFromId(id, env);
}
