/*
  RATINGS.COMPONENT.TS (Lógica de Calificaciones WEB)

  Este componente maneja el formulario de "Calificaciones".
  1. Graba audio REAL usando MediaRecorder (solo en el frontend).
  2. Permite la pre-reproducción de ese audio.
  3. Guarda SOLO el texto (escenario, estrellas, comentario) en Cloud Firestore.
*/
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importamos ambos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 1. IMPORTA LAS HERRAMIENTAS DE FIRESTORE Y DOMSANITIZER
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Para URLs seguras

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.html',
  styleUrls: ['./ratings.css'], // Ruta al .css de la web
  standalone: true,
  // Limpiamos los imports: solo necesitamos CommonModule y ReactiveFormsModule
  imports: [CommonModule, FormsModule, ReactiveFormsModule] 
})
export class Ratings implements OnInit { // <-- Nombre de la clase cambiado

  ratingForm!: FormGroup; 
  // Copiamos tus escenarios de Dark Souls :)
  scenarios: string[] = [
   'ANOR LONDO',
   'MAJULA',
   'PARROQUIA DE LOS NO MUERTOS',
   'BOSQUE DE LOS GIGANTES'
  ];

  // Lógica de calificación por estrellas (IDÉNTICA)
  maxStars: number = 5;
  currentRating: number = 0;
  hoverRating: number = 0;

  // --- LÓGICA DE GRABACIÓN REAL (IDÉNTICA) ---
  isRecording: boolean = false;
  hasRecording: boolean = false; 
  audioUrl: SafeUrl | null = null; 
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioStream: MediaStream | null = null; 
  // ---------------------------------------------

  // Propiedades para la imagen (simulado - IDÉNTICO)
  selectedFileName: string = 'Ningún archivo seleccionado';
  
  // 2. INYECTA 'Firestore' Y EL 'Sanitizer' (IDÉNTICO)
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef 
  ) {}

  // ngOnInit (IDÉNTICO)
  ngOnInit(): void {
    // Inicialización del formulario reactivo 
    this.ratingForm = this.fb.group({
      scenario: [this.scenarios[0], Validators.required],
      rating: [null, Validators.required], 
      comment: ['', [Validators.required, Validators.minLength(10)]],
      imageFile: [null],
      audioFile: [null] 
    });
  }

  // --- LÓGICA INTERACTIVA DE ESTRELLAS (IDÉNTICA) ---

  setRating(rating: number) {
    this.currentRating = rating;
    this.ratingForm.get('rating')?.setValue(rating);
  }

  starEnter(rating: number) {
    this.hoverRating = rating;
  }

  starLeave() {
    this.hoverRating = 0;
  }

  getStarColor(star: number): string {
    const activeRating = this.hoverRating || this.currentRating;
    return star <= activeRating ? '#ffc72c' : '#4a4a58'; 
  }
  
  // --- MANEJO DE ARCHIVOS (Imagen - Simulado - IDÉNTICO) ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.ratingForm.get('imageFile')?.setValue(file);
    } else {
      this.selectedFileName = 'Ningún archivo seleccionado';
      this.ratingForm.get('imageFile')?.setValue(null);
    }
  }

  // --- 3. LÓGICA DE AUDIO (IDÉNTICA) ---
  async toggleRecording() {
    if (this.isRecording) {
      // --- DETENER GRABACIÓN ---
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
      if (this.audioStream) {
        this.audioStream.getTracks().forEach(track => track.stop());
      }
      
    } else {
      // --- INICIAR GRABACIÓN ---
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.audioStream);
        
        this.audioChunks = [];
        this.audioUrl = null;
        this.hasRecording = false;
        this.isRecording = true;

        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          this.hasRecording = true;
          this.cdr.detectChanges(); // Forzamos la detección
        };
        
        this.mediaRecorder.start();

      } catch (e) {
        console.error('Error al iniciar la grabación:', e);
        alert('No se pudo iniciar la grabación. ¿Diste permiso para el micrófono?');
      }
    }
  }

  // --- 4. ENVÍO DEL FORMULARIO (IDÉNTICO) ---
  async onSubmit() {
    if (!this.ratingForm.valid) {
      alert('Por favor, completa todos los campos requeridos (estrellas y comentario).');
      this.ratingForm.markAllAsTouched();
      return;
    }

    const ratingData = {
      scenario: this.ratingForm.value.scenario,
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comment,
      timestamp: new Date()
    };

    try {
      const ratingsCollection = collection(this.firestore, 'ratings');
      await addDoc(ratingsCollection, ratingData);

      alert('¡Gracias por tu calificación!');
      this.resetForm(); 

    } catch (e) {
      console.error('Error al guardar la calificación:', e);
      alert('Hubo un error al enviar tu calificación. Intenta de nuevo.');
    }
  }

  // 5. FUNCIÓN DE RESETEO (IDÉNTICA)
  private resetForm() {
    this.ratingForm.reset({ 
      scenario: this.scenarios[0], 
      rating: null, 
      comment: '', 
      imageFile: null, 
      audioFile: null 
    });
    this.currentRating = 0;
    this.selectedFileName = 'Ningún archivo seleccionado';
    this.audioUrl = null;
    this.hasRecording = false;
    this.isRecording = false;
  }
}