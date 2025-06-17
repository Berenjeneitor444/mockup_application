# Checkin

Checkin is an Angular application developed by **Kritical Lab** for **Tyche Group**, to ease the checking process in **Majestic Hotels**.

## Configuration

App configuration is managed though `environments/`.

Common configuration lives inside `environements/environment.base.ts`.

Each build environment defined in `angular.json` has a dedicated configuration file that extends the base configuration:

- Development: `environment.dev.ts`.
- Staging: `environment.staging.ts`.
- Production: `environment.prod.ts`.

Check `src/app/services/conf/types.ts` for environment options.

## Serve

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `npm run start:staging` to serve the `staging` version (pointing to test).

Run `npm run start:prod` to serve the `production` version.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Contributing

Always run `npm run format` and `npm run lint` before commit.

## Test

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `npm run build` to build the project for production.

Run `npm run build:staging` to build the project for the staging environment.

The generated artifacts will be stored inside `dist/`.

## Distribute

Versions follow [Semantic versioning](https://semver.org/).

Update `version` inside `package.json` and run `npm run dist` to create a zipped distributable package inside `dist/versions`.

NOTE: This command will build the `staging` or `production` distributable depending on the value of `version` inside `package.json`:

- `staging`: if includes `-rc.`
- `production`: if includes `+rc.`
