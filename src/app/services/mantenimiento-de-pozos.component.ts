import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappFabComponent } from '../whatsapp-fab/whatsapp-fab.component';
import { RevealDirective } from '../reveal/reveal.directive';
import { setCanonical } from '../seo/canonical';

@Component({
  selector: 'app-mantenimiento-de-pozos',
  standalone: true,
  imports: [RouterLink, FooterComponent, WhatsappFabComponent, RevealDirective],
  templateUrl: './mantenimiento-de-pozos.component.html',
})
export class MantenimientoDePozosComponent implements OnInit {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.title.setTitle('Mantenimiento de Pozos de Agua en República Dominicana — Hidropozo SRL');
    this.meta.updateTag({
      name: 'description',
      content:
        'Mantenimiento, limpieza y rehabilitación de pozos de agua en República Dominicana. Recuperamos el caudal y prolongamos la vida útil de su pozo. Más de 30 años de experiencia.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'mantenimiento de pozos, limpieza de pozos, rehabilitación de pozos, recuperación de caudal, pozos de agua República Dominicana, Hidropozo SRL',
    });
    setCanonical(this.doc, 'https://hidropozosrl.com/servicios/mantenimiento-de-pozos');
  }
}
