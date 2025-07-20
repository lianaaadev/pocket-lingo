// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { VocabularyService } from './vocab.class'

//*********************
// VOCABULARY SCHEMA
//*********************
export const vocabularySchema = {
  $id: 'Vocabulary',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'word', 'userId'],
  properties: {
    id: { type: 'number' },
    word: { type: 'string', minLength: 1, maxLength: 100 },
    definition: { type: 'string', minLength: 1, maxLength: 500 },
    example: { type: 'string', minLength: 1, maxLength: 500 },
    userId: { type: 'number' }
  }
} as const
export type Vocabulary = FromSchema<typeof vocabularySchema>
export const vocabularyValidator = getValidator(vocabularySchema, dataValidator)
export const vocabularyResolver = resolve<Vocabulary, HookContext<VocabularyService>>({})

//*********************
// VOCABULARY EXTERNAL RESOLVER
//*********************
export const vocabularyExternalResolver = resolve<Vocabulary, HookContext<VocabularyService>>({})

//*********************
// VOCABULARY DATA SCHEMA
//*********************
export const vocabularyDataSchema = {
  $id: 'VocabularyData',
  type: 'object',
  additionalProperties: false,
  required: ['word'],
  properties: {
    ...vocabularySchema.properties
  }
} as const
export type VocabularyData = FromSchema<typeof vocabularyDataSchema>
export const vocabularyDataValidator = getValidator(vocabularyDataSchema, dataValidator)
export const vocabularyDataResolver = resolve<VocabularyData, HookContext<VocabularyService>>({})

//*********************
// VOCABULARY QUERY SCHEMA
//*********************
export const vocabularyQuerySchema = {
  $id: 'VocabularyQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(vocabularySchema.properties)
  }
} as const
export type VocabularyQuery = FromSchema<typeof vocabularyQuerySchema>
export const vocabularyQueryValidator = getValidator(vocabularyQuerySchema, queryValidator)
export const vocabularyQueryResolver = resolve<VocabularyQuery, HookContext<VocabularyService>>({})
