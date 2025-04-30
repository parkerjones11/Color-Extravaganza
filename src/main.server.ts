import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ FIXED: added withFetch
import { provideRouter } from '@angular/router';

export default () => bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withFetch()) // ✅ FIXED: use withFetch here
  ]
});
