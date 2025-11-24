import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common'; 
import { Observable } from 'rxjs'; 
import { GalleryService, GalleryItem } from '../../services/gallery'; 
import { GalleryDetailComponent } from '../../components/gallery-detail/gallery-detail'; 

@Component({
  selector: 'app-gallery', 
  standalone: true, 
  imports: [CommonModule, GalleryDetailComponent, UpperCasePipe], 
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class GalleryComponent implements OnInit {

  public galleryItems$!: Observable<GalleryItem[]>;
  public selectedItem: GalleryItem | null = null; // Para el Modal
  
  // NUEVO: Para las categorías
  selectedCategory: string | null = null; 

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryItems$ = this.galleryService.getGalleryItems();
  }

  // Lógica de Categorías
  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  resetCategory() {
    this.selectedCategory = null;
  }

  // Lógica del Modal
  openDetailModal(item: GalleryItem) {
    this.selectedItem = item;
  }

  closeDetailModal() {
    this.selectedItem = null;
  }
}