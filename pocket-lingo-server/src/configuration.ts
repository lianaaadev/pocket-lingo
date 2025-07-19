import { defaultAppSettings, getValidator } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import { dataValidator } from './validators'

export const configurationSchema = {
  $id: 'configuration',
  type: 'object',
  additionalProperties: false,
  required: ['host', 'port', 'public'],
  properties: {
    ...defaultAppSettings,
    host: { type: 'string' },
    port: { type: 'number' },
    public: { type: 'string' },
    authentication: {
      type: 'object',
      required: ['secret', 'service'],
      properties: {
        secret: { type: 'string' },
        service: { type: 'string' },
        local: {
          type: 'object',
          properties: {
            usernameField: { type: 'string' },
            passwordField: { type: 'string' }
          }
        }
      }
    }
  }
} as const

export const configurationValidator = getValidator(configurationSchema, dataValidator)

export type ApplicationConfiguration = FromSchema<typeof configurationSchema>
