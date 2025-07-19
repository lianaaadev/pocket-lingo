// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UsersService } from './users.class'

//*********************
// USERS SCHEMA 
//*********************
export const usersSchema = {
  $id: 'Users',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'firstName', 'lastName', 'username', 'password'],
  properties: {
    id: { type: 'number' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' }
  }
} as const

export type Users = FromSchema<typeof usersSchema>
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve<Users, HookContext<UsersService>>({})

//*********************
// USERS EXTERNAL RESOLVER
//*********************
export const usersExternalResolver = resolve<Users, HookContext<UsersService>>({
  password: async () => undefined
})

//*********************
// USERS DATA SCHEMA
//*********************
export const usersDataSchema = {
  $id: 'UsersData',
  type: 'object',
  additionalProperties: false,
  required: ['firstName', 'lastName', 'username', 'password'],
  properties: {
    ...usersSchema.properties
  }
} as const
export type UsersData = FromSchema<typeof usersDataSchema>
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve<UsersData, HookContext<UsersService>>({
  properties: {
    password: passwordHash({ strategy: 'local' })
  }
})

//*********************
// USERS PATCH SCHEMA
//*********************
export const usersPatchSchema = {
  $id: 'UsersPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...usersSchema.properties
  }
} as const
export type UsersPatch = FromSchema<typeof usersPatchSchema>
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve<UsersPatch, HookContext<UsersService>>({})

//*********************
// USERS QUERY SCHEMA
//*********************
export const usersQuerySchema = {
  $id: 'UsersQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(usersSchema.properties)
  }
} as const
export type UsersQuery = FromSchema<typeof usersQuerySchema>
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve<UsersQuery, HookContext<UsersService>>({})
