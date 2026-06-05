import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  playing?: boolean; // solo para videos
}

interface GalleryGroup {
  heading: string;     // título del apartado
  items: GalleryItem[];
  expanded?: boolean;  // si el apartado muestra todas sus tarjetas
}

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.css']
})
export class ProjectGalleryComponent {
  // Galería agrupada por apartados (categorías de trabajo).
  // Para agregar más apartados o items, edita este arreglo.
  groups: GalleryGroup[] = [
    {
      heading: 'Perforación de pozos',
      items: [
        { type: 'video', src: 'assets/images/hidropozo-proyecto-1.mp4', title: 'Pozo en producción' },
        { type: 'image', src: 'assets/images/hidropozo-perforacion-3.jpg', title: 'Equipo de perforación en obra' },
        { type: 'video', src: 'assets/images/hidropozo-proyecto-2.mp4', title: 'Perforación en proceso' },
        { type: 'image', src: 'assets/images/hidropozo-perforacion-1.jpg', title: 'Supervisión de perforación' },
        { type: 'image', src: 'assets/images/hidropozo-perforacion-5.jpg', title: 'Perforación de pozo profundo' },
        { type: 'video', src: 'assets/images/hidropozo-proyecto-3.mp4', title: 'Pozo en operación' },
        { type: 'image', src: 'assets/images/hidropozo-obra-1.jpg', title: 'Trabajo de campo' },
      ],
    },
    {
      heading: 'Pruebas de infiltración',
      items: [
        { type: 'video', src: 'assets/images/hidropozo-proyecto-4.mp4', title: 'Prueba de infiltración' },
        { type: 'video', src: 'assets/images/hidropozo-proyecto-5.mp4', title: 'Prueba de infiltración' },
        { type: 'video', src: 'assets/images/hidropozo-proyecto-6.mp4', title: 'Prueba de infiltración' },
      ],
    },
  ];

  // Máximo de tarjetas visibles por apartado antes de mostrar "Ver más".
  readonly limit = 2;

  @ViewChildren('videoEl') videoEls!: QueryList<ElementRef<HTMLVideoElement>>;

  // Tarjetas visibles de un apartado según su estado (colapsado/expandido).
  visibleItems(group: GalleryGroup): GalleryItem[] {
    return group.expanded ? group.items : group.items.slice(0, this.limit);
  }

  playVideo(item: GalleryItem, video: HTMLVideoElement) {
    item.playing = true;
    video.play();
  }

  // Al iniciar un video, pausa cualquier otro que esté reproduciéndose
  // (cubre tanto el botón de play como los controles nativos).
  onPlay(playing: HTMLVideoElement) {
    this.videoEls?.forEach(ref => {
      const v = ref.nativeElement;
      if (v !== playing && !v.paused) {
        v.pause();
      }
    });
  }
}
