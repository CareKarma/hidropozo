import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  role: string;  // cargo / empresa / zona
  stars: number; // 1-5
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  // Cada item: cita textual, nombre del cliente, zona y nº de estrellas.
  // Para agregar más reseñas reales, añade objetos a este arreglo.
  testimonials: Testimonial[] = [
    {
      quote: 'Perforaron el pozo de mi finca y quedé muy satisfecho. Cumplieron con el tiempo que acordamos y el agua salió de buena calidad. Gente seria y trabajadora.',
      name: 'Gabriel Félix',
      role: 'San Juan',
      stars: 5,
    },
  ];

  // Helper para iterar las estrellas en la plantilla.
  starsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
