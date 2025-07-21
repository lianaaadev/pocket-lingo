import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app, 'authentication', {
    entity: 'user',
    service: 'users'
  })

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('authentication', authentication)

  app.service('authentication').hooks({
    after: {
      create: [
        (context) => {
          console.log('✅ AUTH:', context.result); // TODO: for test only. Remove in production!
          return context;
        }
      ]
    }
  });
}