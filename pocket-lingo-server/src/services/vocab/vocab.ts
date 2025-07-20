// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  vocabularyDataValidator,
  vocabularyQueryValidator,
  vocabularyResolver,
  vocabularyExternalResolver,
  vocabularyDataResolver,
  vocabularyQueryResolver
} from './vocab.schema'

import type { Application } from '../../declarations'
import { VocabularyService, getOptions } from './vocab.class'

import { setUserId } from "./hooks/set-user-id";
import { filterByUser } from "./hooks/filter-by-user";

export const vocabularyPath = 'vocab'
export const vocabularyMethods: Array<keyof VocabularyService> = ['find', 'create']

export * from './vocab.class'
export * from './vocab.schema'

export const vocabulary = (app: Application) => {
  app.use(vocabularyPath, new VocabularyService(getOptions(app)), {
    methods: vocabularyMethods,
    events: []
  })

  app.service(vocabularyPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(vocabularyExternalResolver),
        schemaHooks.resolveResult(vocabularyResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(vocabularyQueryValidator),
        schemaHooks.resolveQuery(vocabularyQueryResolver)
      ],
      find: [filterByUser],
      create: [
        schemaHooks.validateData(vocabularyDataValidator),
        schemaHooks.resolveData(vocabularyDataResolver),
        setUserId
      ],
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [vocabularyPath]: VocabularyService
  }
}
