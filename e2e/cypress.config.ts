import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run ed-app-ce:serve',
        production: 'nx run ed-app-ce:preview',
      },
      ciWebServerCommand: 'nx run ed-app-ce:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
