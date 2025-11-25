import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common'; 
import { GalleryItem } from '../../services/gallery';


@Component({
  selector: 'app-gallery-detail',
  standalone: true,
  templateUrl: './gallery-detail.html',
  styleUrls: ['./gallery-detail.css'],
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