import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface PlaceReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  stars: number;
  photoUrl?: string;
}

const FALLBACK: Testimonial[] = [
  {
    quote: 'Perforaron el pozo de mi finca y quedé muy satisfecho. Cumplieron con el tiempo que acordamos y el agua salió de buena calidad. Gente seria y trabajadora.',
    name: 'Gabriel Félix',
    role: 'Las Charcas de María Nova',
    stars: 5,
  },
  {
    quote: 'Profesionales, responsables y un servicio de primera.',
    name: 'Freddy Cedano',
    role: 'Las Charcas de María Nova',
    stars: 5,
  },
];

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = FALLBACK;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<PlaceReview[]>('/api/reviews').subscribe({
      next: (reviews) => {
        if (reviews?.length) {
          this.testimonials = reviews.map(r => ({
            quote: r.text,
            name: r.author_name,
            role: r.relative_time_description ?? 'Google Reviews',
            stars: r.rating,
            photoUrl: r.profile_photo_url,
          }));
        }
      },
      error: () => {
        this.testimonials = FALLBACK;
      },
    });
  }

  starsArray(n: number): number[] {
    return Array.from({ length: n });
  }
}
