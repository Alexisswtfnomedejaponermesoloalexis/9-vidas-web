
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './contact.html', 
  styleUrls: ['./contact.css']   
})
export class Contact implements OnInit { 
  
  contactForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore 
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      problem: ['', [Validators.required, Validators.minLength(20)]] 
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true; 
      const formData = this.contactForm.value;
      
      try {
        const reportsCollection = collection(this.firestore, 'bug_reports');
        
        await addDoc(reportsCollection, formData);

        alert(`¡Reporte enviado! Nos contactaremos a ${formData.email} en breve.`);
        
        this.contactForm.reset();

      } catch (e) {
        console.error('Error al enviar reporte:', e);
        alert('Hubo un error al enviar el reporte. Intenta nuevamente.');
      } finally {
        this.isSubmitting = false; 
      }
      
    } else {
      alert('Por favor, completa correctamente todos los campos marcados.');
      this.contactForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}