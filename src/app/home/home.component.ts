import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { NgOptimizedImage, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { setCanonical } from '../seo/canonical';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { WhatsappFabComponent } from '../whatsapp-fab/whatsapp-fab.component';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { CountUpDirective } from '../count-up/count-up.directive';
import { RevealDirective } from '../reveal/reveal.directive';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ContactFormComponent, WhatsappFabComponent, ProjectGalleryComponent, TestimonialsComponent, CountUpDirective, RevealDirective, NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private title: Title, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    // Restablece título y canonical por si se llega desde una página legal (que los cambia)
    this.title.setTitle('Hidropozo SRL — Perforación y Mantenimiento de Pozos en República Dominicana');
    setCanonical(this.doc, 'https://hidropozosrl.com/');
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  onRequestService(_serviceKey: string) {
    // Baja directo al formulario (no al mapa, que va primero en la sección)
    document.querySelector('#form-contacto')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSection(sectionId: string) {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
