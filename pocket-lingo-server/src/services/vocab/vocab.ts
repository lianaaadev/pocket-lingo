// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  vocabularyDataValidator,
  vocabularyPatchValidator,
  vocabularyQueryValidator,
  vocabularyResolver,
  vocabularyExternalResolver,
  vocabularyDataResolver,
  vocabularyPatchResolver,
  vocabularyQueryResolver
} from './vocab.schema'

import type { Application } from '../../declarations'
import { VocabularyService, getOptions } from './vocab.class'

export const vocabularyPath = 'vocab'
export const vocabularyMethods: Array<keyof VocabularyService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './vocab.class'
export * from './vocab.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const vocabulary = (app: Application) => {
  // Register our service on the Feathers application
  app.use(vocabularyPath, new VocabularyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: vocabularyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
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
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(vocabularyDataValidator),
        schemaHooks.resolveData(vocabularyDataResolver)
      ],
      patch: [
        schemaHooks.validateData(vocabularyPatchValidator),
        schemaHooks.resolveData(vocabularyPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [vocabularyPath]: VocabularyService
  }
}
