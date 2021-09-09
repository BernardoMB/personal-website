# PersonalWebsite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4204/`. The app will automatically reload if you change any of the source files.

Run `npm run serve-devices` to debug this application locally in mobile devices.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build 

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

See Azure Pipelines.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Features

### Scroll to top button 

See `scroll-to-top.component.ts`.

### Parallax effects

See landing page carousel.

### ParticleJS

See landing page carousel.

### Ngx Charts

See experience.

### Fontawesome icons

### Diaog service

### Resolvers multiple calls

See application resolver services.

### TypedJS

See landing page carousel.

### Themes

Theme selection storing previously used theme in localstorage.

See the following tutorial for working with angular material theming:
https://medium.com/grensesnittet/dynamic-themes-in-angular-material-b6dc0c88dfd7

See behavior subject to subscribe to theme changes.

### Swipper

See landing page carousel.

### Loading bar

See `loader.service.ts` and `loadingbar.component.ts`.

### Simulated API calls

Some `.service.ts` files have or had simulated API calls.

### Sidebar

Using Angular Material drawer.

### Animations

* Zoom in: See projects section.
* Bouncing: See landing page.
* Rotating: See landing page.

### Send whatsapp

See `landing.component.ts`.

### Sticky header

See `header.component.ts`.

### Scroll indicator progress bar

See `scroll-indicator.component.ts`.

### Ng Feedback

See landing page component. This library's styles were modified, please see `ng-feedback-theme.scss`.

### Ngx Translate

See `en.json`, `es.json`, `app.module.ts`, `app.component.ts`, `header.component.ts` to change the language and a child module like `cv.module.ts`.

### Scroll to section

See `header.component.ts`, `app-routing.module.ts`, styles for html on `styles.scss` global style file, and `landing.component.ts`.

### NgRx

Not in much use accross the aplication.

## AWS

This website makes API calls to AWS API Gateway integrated with AWS Lambda.

## Azure

Deployed using the following tutorial: https://towardsdatascience.com/how-to-deploy-web-apps-with-azure-52ca340b41b9

App service name: bernardomondragon

# Deployment notes

After deployment is done make sure your files are uploaded in directory site/wwwroot. If not, then map physical path to site/wwwroot/<app_name> in Azure App Settings configurations.

Add web.config file to src directory. Dot forget to include web.config file in angular.json

Web config also includes tweks for making the NgxTranslate library to work. See links:

https://stackoverflow.com/questions/44756251/json-language-files-are-not-found-ngx-translate-angular-cli/51121032#51121032
https://github.com/ngx-translate/core/issues/853
https://stackoverflow.com/questions/54977651/ngx-translate-after-deply-getting-error-as-assets-i18n-shared-fr-json-404
https://github.com/ngx-translate/core/issues/674

# Adding projects

Generate gif: Use API Gifs
Croping and overlaping: https://www.kapwing.com/611c68fbcddde800645059b1/studio/editor/layer/822e9ec1-ee0b-41d1-a5de-2ef258574349
Speed: https://ezgif.com/speed
