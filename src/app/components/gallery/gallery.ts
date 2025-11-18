/*
  GALLERY.COMPONENT.TS (Lógica de la Galería Web)
  
  Correcciones:
  1. Se cambió el nombre de la clase de 'Gallery' a 'GalleryComponent'.
  2. Se importó 'UpperCasePipe' para que 'item.nombre | uppercase' funcione.
*/

// Importaciones de Angular
import { Component, OnInit } from '@angular/core';
// Importamos CommonModule y UpperCasePipe
import { CommonModule, UpperCasePipe } from '@angular/common'; 
import { Observable } from 'rxjs'; 

// Importaciones de nuestro proyecto
import { GalleryService, GalleryItem } from '../../services/gallery'; 
import { GalleryDetailComponent } from '../../components/gallery-detail/gallery-detail'; 

@Component({
  selector: 'app-gallery', 
  standalone: true, 
  // Añadimos UpperCasePipe a los imports
  imports: [CommonModule, GalleryDetailComponent, UpperCasePipe], 
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css'] 
})
// Arreglado: El nombre de la clase ahora es GalleryComponent
export class GalleryComponent implements OnInit {

  public galleryItems$!: Observable<GalleryItem[]>;
  public selectedItem: GalleryItem | null = null;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryItems$ = this.galleryService.getGalleryItems();
  }

  openDetailModal(item: GalleryItem) {
    this.selectedItem = item;
  }

  closeDetailModal() {
    this.selectedItem = null;
  }
}