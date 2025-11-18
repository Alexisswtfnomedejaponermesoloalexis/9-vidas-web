import { Routes } from '@angular/router';
import { Gallery } from './components/gallery/gallery';
import { Scores } from './components/scores/scores';
import { Ratings } from './components/ratings/ratings';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
    { path: '', redirectTo: '/gallery', pathMatch: 'full' }, 
  { path: 'gallery', component: Gallery },
  { path: 'scores', component: Scores },
  { path: 'ratings', component: Ratings },
  { path: 'contact', component: Contact },
  // Opcional: Ruta 404 para URLs que no existen
  { path: '**', component: Gallery },
];
