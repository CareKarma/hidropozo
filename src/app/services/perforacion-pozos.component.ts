import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappFabComponent } from '../whatsapp-fab/whatsapp-fab.component';
import { RevealDirective } from '../reveal/reveal.directive';
import { setCanonical } from '../seo/canonical';

@Component({
  selector: 'app-perforacion-pozos',
  standalone: true,
  imports: [RouterLink, FooterComponent, WhatsappFabComponent, RevealDirective],
  templateUrl: './perforacion-pozos.component.html',
})
export class PerforacionPozosComponent implements OnInit {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.title.setTitle('Perforación de Pozos de Agua en República Dominicana — Hidropozo SRL');
    this.meta.updateTag({
      name: 'description',
      content:
        'Perforación de pozos de agua, pozos filtrantes y pilotes en República Dominicana. Más de 30 años de experiencia. Equipo moderno y resultados confiables. Solicite su cotización.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'perforación de pozos, perforación de pozos de agua, pozos filtrantes, pilotes, pozos República Dominicana, Hidropozo SRL, Santo Domingo',
    });
    setCanonical(this.doc, 'https://hidropozosrl.com/servicios/perforacion-de-pozos');
  }
}
