// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Vocabulary, VocabularyData, VocabularyPatch, VocabularyQuery } from './vocab.schema'

export type { Vocabulary, VocabularyData, VocabularyPatch, VocabularyQuery }

export interface VocabularyParams extends KnexAdapterParams<VocabularyQuery> {}

//*********************
// VOCABULARY SERVICE
//*********************
export class VocabularyService<ServiceParams extends Params = VocabularyParams> extends KnexService<
  Vocabulary,
  VocabularyData,
  VocabularyParams,
  VocabularyPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'vocab'
  }
}
