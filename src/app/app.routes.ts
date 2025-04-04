import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ColorGenerationComponent } from './color-generation/color-generation.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About us' },
  { path: 'color-generation', component: ColorGenerationComponent, title: 'Color Generator' },
  { path: '**', redirectTo: '' }
];
