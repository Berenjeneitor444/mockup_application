import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { appVersion } from './environments/version';

const dsn = environment.monitor?.providers.sentry?.dsn;
if (dsn) {
  Sentry.init({
    dsn,
    release: 'checkin-paperless@' + appVersion,
    debug: false, // SDK will attempt to print out useful debugging information
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
      Sentry.replayIntegration(),
    ],
    environment: environment.name,
    // Tracing
    sampleRate: 1,
    tracesSampleRate: 1, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost'],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    // Set profilesSampleRate to 1.0 to profile every transaction.
    // Since profilesSampleRate is relative to tracesSampleRate,
    // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
    // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
    // results in 25% of transactions being profiled (0.5*0.5=0.25)
    profilesSampleRate: 0,
    // Enable logs to be sent to Sentry
    _experiments: { enableLogs: true },
  });
}

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
