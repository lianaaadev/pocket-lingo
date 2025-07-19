import { vocabulary } from './vocab/vocab'
import { users } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(vocabulary)
  app.configure(users)
  // All services will be registered here
}
