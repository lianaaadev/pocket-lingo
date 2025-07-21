// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

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
export const usersMethods: Array<keyof UsersService> = ['create', 'find']

export * from './users.class'
export * from './users.schema'

export const users = (app: Application) => {
  app.use(usersPath, new UsersService(getOptions(app)), {
    methods: usersMethods,
    events: []
  })
  // Initialize hooks
  app.service(usersPath).hooks({
    around: {
      create: [
        schemaHooks.resolveExternal(usersExternalResolver), // remove password from response
        schemaHooks.resolveResult(usersResolver) // return user
      ],
      find: [
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
      find: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)]
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [usersPath]: UsersService
  }
}
