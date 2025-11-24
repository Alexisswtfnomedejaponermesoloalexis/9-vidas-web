import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GalleryService, Rating } from '../../services/gallery';

@Component({
  selector: 'app-scenario-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scenario-reviews.html',
  styleUrls: ['./scenario-reviews.css']
})
export class ScenarioReviewsComponent implements OnInit {

  @Input() scenarioName!: string;
  @Output() close = new EventEmitter<void>();

  ratings$!: Observable<Rating[]>;

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.ratings$ = this.galleryService.getRatingsByScenario(this.scenarioName);
  }

  closeModal() {
    this.close.emit();
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}