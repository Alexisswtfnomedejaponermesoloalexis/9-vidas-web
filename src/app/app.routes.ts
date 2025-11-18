import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery';
import { Scores } from './components/scores/scores';
import { Ratings } from './components/ratings/ratings';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
    { path: '', redirectTo: '/galleryComponent', pathMatch: 'full' }, 
  { path: 'galleryComponent', component: GalleryComponent },
  { path: 'scores', component: Scores },
  { path: 'ratings', component: Ratings },
  { path: 'contact', component: Contact },
  // Opcional: Ruta 404 para URLs que no existen
  { path: '**', component: GalleryComponent },
];
