import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * Anima la aparición de un elemento (fade-in + slide-up) la primera vez que
 * entra en el viewport. Respeta prefers-reduced-motion.
 *
 * Importante: la clase que OCULTA el elemento se agrega por JS. Si el JS no
 * corre, el contenido queda visible (no se esconde nada por error).
 *
 * Uso:  <div appReveal>…</div>  |  <div appReveal [revealDelay]="120">…</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0; // ms de retardo (para escalonar grids)

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // sin animación: contenido visible tal cual

    const node = this.el.nativeElement;
    node.classList.add('reveal-init');
    if (this.revealDelay) {
      node.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal-in');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(node);

    // Red de seguridad: si el elemento ya está visible al cargar, revelar de
    // inmediato (no depender solo del observer). Garantiza que nada quede oculto.
    requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        node.classList.add('reveal-in');
        this.observer?.unobserve(node);
      }
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
