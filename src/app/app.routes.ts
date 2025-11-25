import { Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery';
import { ScoresComponent } from './components/scores/scores';
import { RatingsComponent } from './components/ratings/ratings';
import { Contact } from './components/contact/contact';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
    { path: '', redirectTo: '/galleryComponent', pathMatch: 'full' }, 
  { path: 'galleryComponent', component: GalleryComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: 'contact', component: Contact },
  { path: 'about', component: AboutComponent },
  { path: '**', component: GalleryComponent },
];
