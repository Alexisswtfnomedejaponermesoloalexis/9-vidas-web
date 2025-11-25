import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common'; 
import { Observable } from 'rxjs'; 
import { GalleryService, GalleryItem } from '../../services/gallery'; 
import { GalleryDetailComponent } from '../../components/gallery-detail/gallery-detail'; 
import { ScenarioReviewsComponent } from '../../components/scenario-reviews/scenario-reviews';
@Component({
  selector: 'app-gallery', 
  standalone: true, 
  imports: [CommonModule, GalleryDetailComponent, UpperCasePipe,ScenarioReviewsComponent], 
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class GalleryComponent implements OnInit {

  public galleryItems$!: Observable<GalleryItem[]>;
  public selectedItem: GalleryItem | null = null; 
  
  selectedCategory: string | null = null; 
  public selectedScenarioForReviews: GalleryItem | null = null; 

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.galleryItems$ = this.galleryService.getGalleryItems();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  resetCategory() {
    this.selectedCategory = null;
  }

  openDetailModal(item: GalleryItem) {
    this.selectedItem = item;
  }

  closeDetailModal() {
    this.selectedItem = null;
  }
  openReviewsModal(item: GalleryItem) {
    this.selectedScenarioForReviews = item;
  }

  closeReviewsModal() {
    this.selectedScenarioForReviews = null;
  }
}