// src/app/components/contact/contact.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Necesario

@Component({
  selector: 'app-contact',
  standalone: true,
  // Asegúrate de importar ReactiveFormsModule y CommonModule
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
  
  contactForm!: FormGroup;
  isSubmitting: boolean = false; // Para deshabilitar el botón durante el envío

  // Inyectamos FormBuilder
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicialización del formulario con validaciones
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Valida formato de correo
      problem: ['', [Validators.required, Validators.minLength(20)]] // Detalle del problema
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const formData = this.contactForm.value;
      
      console.log('Reporte de Bug listo para enviar:', formData);
      
      // *** Lógica de Backend (Simulada) ***
      // En un entorno real, aquí se haría una llamada a un servicio
      // de backend (ej: Express, PHP, Firebase Function) que a su vez
      // utiliza una librería de envío de correo (ej: Nodemailer).

      setTimeout(() => {
        this.isSubmitting = false;
        alert(`¡Reporte enviado! Nos contactaremos a ${formData.email} en breve.`);
        // Resetear el formulario y los estados
        this.contactForm.reset();
        this.contactForm.get('name')?.setValue(''); 
        this.contactForm.get('email')?.setValue(''); 
        this.contactForm.get('problem')?.setValue(''); 
        
      }, 2000); // Simulación de espera de 2 segundos
      
    } else {
      alert('Por favor, completa correctamente todos los campos marcados.');
      this.contactForm.markAllAsTouched();
    }
  }

  // Función de utilidad para verificar si un campo tiene errores
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}