import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent {

  // Array con la información de tu equipo
  // (Asegúrate de que los nombres de las imágenes coincidan con lo que tienes en assets/imagenes/)
  teamMembers = [
    {
      name: ' ISHHHH STUDIOS',  
      role: '¿Quienes somos?',
      description: 'Somos un equipo con un solo propósito, cumplir siempre con el objetivo',
      image: 'assets/galeria/logo.jpeg' 
    },
    {
      name: '9 VIDAS',
      role: '¿Qué hacemos?',
      description: 'Aquí buscamos crear algo en que divertirte y entretenerte, si buscas matar un rato el tiempo, aquí es el lugar que buscas',
      image: 'assets/galeria/9vidas.jpeg' 
    },
    {
      name: '9 VIDAS TEAM',
      role: 'NOSOTROS',
      description: 'Estos somos nosotros, somos unos desarrolladores de software en proceso.',
      image: 'assets/galeria/us2.jpeg'
    }
  ];

}