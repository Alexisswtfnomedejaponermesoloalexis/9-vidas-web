import { Component, Input, Output, EventEmitter } from '@angular/core';
// 1. IMPORTA UpperCasePipe y CommonModule (CommonModule es bueno tenerlo)
import { CommonModule, UpperCasePipe } from '@angular/common'; 
import { GalleryItem } from '../../services/gallery';

// Importamos el componente modal

@Component({
  selector: 'app-gallery-detail',
  standalone: true,
  templateUrl: './gallery-detail.html',
  styleUrls: ['./gallery-detail.css'],
  // 2. AÑADE UpperCasePipe a los imports
  imports: [CommonModule, UpperCasePipe] 
})
export class GalleryDetailComponent {
  @Input() item!: GalleryItem; 
  @Output() close = new EventEmitter<void>(); 

  constructor() { }

  closeModal() {
    this.close.emit();
  }
}