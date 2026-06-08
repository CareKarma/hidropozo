import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  activeSection = 'inicio';
  scrolled = false; // true cuando se baja del tope (header sólido)

  private observer!: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 24;
  }

  ngOnInit() {
    this.onScroll(); // estado inicial correcto si la página carga ya scrolleada
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        }
      },
      { threshold: 0.3 }
    );

    ['inicio', 'servicios', 'proyectos', 'nosotros', 'contacto'].forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(sectionId: string, highlightFields = false) {
    this.isMobileMenuOpen = false;
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      if (highlightFields && sectionId === '#form-contacto') {
        setTimeout(() => {
          const nameField = document.querySelector('#name') as HTMLElement;
          const emailField = document.querySelector('#email') as HTMLElement;
          if (nameField && emailField) {
            nameField.classList.add('highlight-field');
            emailField.classList.add('highlight-field');
            setTimeout(() => {
              nameField.classList.remove('highlight-field');
              emailField.classList.remove('highlight-field');
            }, 2000);
          }
        }, 500);
      }
    }
  }
}
