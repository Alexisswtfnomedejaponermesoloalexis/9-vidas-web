// src/app/components/contact/contact.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

// 1. IMPORTA LAS HERRAMIENTAS DE FIRESTORE
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], 
  templateUrl: './contact.html', // Asegúrate que este nombre coincida con tu archivo
  styleUrls: ['./contact.css']   // Asegúrate que este nombre coincida con tu archivo
})
export class Contact implements OnInit { // <-- Nombre actualizado
  
  contactForm!: FormGroup;
  isSubmitting: boolean = false;

  // 2. INYECTA FIRESTORE EN EL CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private firestore: Firestore // <-- Inyección necesaria
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      problem: ['', [Validators.required, Validators.minLength(20)]] 
    });
  }

  // 3. LÓGICA REAL DE ENVÍO A FIREBASE
  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true; // Bloquea el botón
      const formData = this.contactForm.value;
      
      try {
        // Apunta a la colección 'bug_reports' (privada)
        const reportsCollection = collection(this.firestore, 'bug_reports');
        
        // Guarda los datos
        await addDoc(reportsCollection, formData);

        // Éxito
        alert(`¡Reporte enviado! Nos contactaremos a ${formData.email} en breve.`);
        
        // Resetea el formulario
        this.contactForm.reset();

      } catch (e) {
        console.error('Error al enviar reporte:', e);
        alert('Hubo un error al enviar el reporte. Intenta nuevamente.');
      } finally {
        this.isSubmitting = false; // Desbloquea el botón
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