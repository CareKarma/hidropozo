import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappFabComponent } from '../whatsapp-fab/whatsapp-fab.component';
import { RevealDirective } from '../reveal/reveal.directive';
import { setCanonical } from '../seo/canonical';

@Component({
  selector: 'app-estudios-hidrogeologicos',
  standalone: true,
  imports: [RouterLink, FooterComponent, WhatsappFabComponent, RevealDirective],
  templateUrl: './estudios-hidrogeologicos.component.html',
})
export class EstudiosHidrogeologicosComponent implements OnInit {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.title.setTitle('Estudios Hidrogeológicos en República Dominicana — Hidropozo SRL');
    this.meta.updateTag({
      name: 'description',
      content:
        'Estudios hidrogeológicos, prospección de aguas subterráneas y pruebas de bombeo, aforo e infiltración en República Dominicana. Más de 30 años ubicando la mejor fuente de agua antes de perforar.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'estudios hidrogeológicos, prospección de aguas subterráneas, prueba de bombeo, aforo de pozos, prueba de infiltración, agua subterránea República Dominicana, Hidropozo SRL',
    });
    setCanonical(this.doc, 'https://hidropozosrl.com/servicios/estudios-hidrogeologicos');
  }
}
