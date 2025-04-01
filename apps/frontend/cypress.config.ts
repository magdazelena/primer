import { defineConfig } from 'cypress';
import intercept from 'cypress/plugins'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    experimentalStudio: true,
    env: {
      api_url: 'http://localhost:1337/api',
    },
    setupNodeEvents(on, config) {
      on('task', {
        'mockServer': ({ interceptUrl, fixture }) => {
          return intercept({ interceptUrl, fixture });
        },
      });
    },
  },
}); 