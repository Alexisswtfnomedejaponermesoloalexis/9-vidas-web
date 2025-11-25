import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { GalleryService, GalleryItem } from '../../services/gallery';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.html',
  styleUrls: ['./ratings.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class RatingsComponent implements OnInit {

  ratingForm!: FormGroup; 
  scenariosList: GalleryItem[] = [];
  selectedScenario: GalleryItem | null = null;

  maxStars: number = 5;
  currentRating: number = 0;
  hoverRating: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.galleryService.getScenariosOnly().subscribe(res => {
      this.scenariosList = res;
    });

    this.ratingForm = this.fb.group({
      scenario: [null, Validators.required],
      rating: [null, Validators.required], 
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onScenarioChange(event: any) {
    this.selectedScenario = this.ratingForm.get('scenario')?.value;
  }

  setRating(rating: number) {
    this.currentRating = rating;
    this.ratingForm.get('rating')?.setValue(rating);
  }
  
  starEnter(r: number) { this.hoverRating = r; }
  starLeave() { this.hoverRating = 0; }
  getStarColor(s: number) { return s <= (this.hoverRating || this.currentRating) ? '#ffc72c' : '#4a4a58'; }

  async onSubmit() {
    if (!this.ratingForm.valid) {
      alert('Por favor, completa todos los campos.');
      this.ratingForm.markAllAsTouched();
      return;
    }

    const scenarioObject = this.ratingForm.value.scenario;

    const ratingData = {
      scenario: scenarioObject.nombre,
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comment,
      timestamp: new Date()
    };

    try {
      await addDoc(collection(this.firestore, 'ratings'), ratingData);
      alert('¡Gracias por tu calificación!');
      this.resetForm(); 
    } catch (e) {
      console.error('Error:', e);
      alert('Error al enviar.');
    }
  }

  private resetForm() {
    this.ratingForm.reset({ scenario: null, rating: null, comment: '' });
    this.currentRating = 0;
    this.selectedScenario = null;
  }
}