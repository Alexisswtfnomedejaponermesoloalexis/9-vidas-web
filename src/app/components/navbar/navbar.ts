import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // <-- Importaciones clave

@Component({
  selector: 'app-navbar',
imports: [RouterLink, RouterLinkActive],  
templateUrl: './navbar.html',
styleUrl: './navbar.css',
})
export class Navbar {

}
