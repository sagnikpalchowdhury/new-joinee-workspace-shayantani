import { ApplicationConfig, FactoryProvider, PLATFORM_ID, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { WINDOW } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: (platformId: Object) => {
    if (isPlatformBrowser(platformId)) {
      return window;
    }
    return { localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} } };
  },
  deps: [PLATFORM_ID],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    windowProvider
  ]
};
