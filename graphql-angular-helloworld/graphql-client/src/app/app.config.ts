import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  Apollo,
  APOLLO_OPTIONS,
  APOLLO_NAMED_OPTIONS
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    Apollo,

    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:5162/graphql',
        }),
      }),
      deps: [HttpLink],
    },

    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        nodeClient: {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/graphql',
          }),
        }
      }),
      deps: [HttpLink],
    },
  ],
};
