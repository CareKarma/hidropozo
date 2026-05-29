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
  // ⚠️ La 1ra (Gabriel Félix) la indicó el cliente; las 2 siguientes son
  //    FICTICIAS (nombres/zonas plausibles) — reemplazar por reseñas reales.
  testimonials: Testimonial[] = [
    {
      quote: 'Perforaron el pozo de mi finca y quedé muy satisfecho. Cumplieron con el tiempo que acordamos y el agua salió de buena calidad. Gente seria y trabajadora.',
      name: 'Gabriel Félix',
      role: 'San Juan',
      stars: 5,
    },
    {
      quote: 'Contratamos a Hidropozo para un proyecto y cumplieron con todo lo acordado. Personal serio y bien equipado, nos explicaron cada paso. Quedamos muy satisfechos.',
      name: 'Ramón Peña',
      role: 'Santiago',
      stars: 5,
    },
    {
      quote: 'Le dan mantenimiento a nuestro pozo desde hace tiempo y siempre responden rápido, hasta en emergencias. Trato amable y precios justos. Los recomiendo.',
      name: 'Carmen Rodríguez',
      role: 'Baní',
      stars: 5,
    },
  ];

  // Helper para iterar las estrellas en la plantilla.
  starsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
