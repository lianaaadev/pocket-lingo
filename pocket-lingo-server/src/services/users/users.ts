// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  usersDataValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersQueryResolver
} from './users.schema'

import type { Application } from '../../declarations'
import { UsersService, getOptions } from './users.class'

export const usersPath = 'users'
export const usersMethods: Array<keyof UsersService> = ['get', 'create']

export * from './users.class'
export * from './users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const users = (app: Application) => {
  // Register our service on the Feathers application
  app.use(usersPath, new UsersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: usersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(usersPath).hooks({
    around: {
      create: [
        schemaHooks.resolveExternal(usersExternalResolver), // remove password from response
        schemaHooks.resolveResult(usersResolver) // return user
      ],
      get: [
        authenticate('jwt'), // ensure user is authenticated
        schemaHooks.resolveExternal(usersExternalResolver), // remove password from response
        schemaHooks.resolveResult(usersResolver) // return user
      ]
    },
    before: {
      create: [
        schemaHooks.validateData(usersDataValidator), 
        schemaHooks.resolveData(usersDataResolver)
      ],
      get: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)]
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [usersPath]: UsersService
  }
}
