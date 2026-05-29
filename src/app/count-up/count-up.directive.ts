import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * Anima el contenido numérico de un elemento desde 0 hasta `appCountUp`
 * la primera vez que entra en el viewport. Respeta prefers-reduced-motion.
 *
 * Uso: <p [appCountUp]="500" suffix="+"></p>
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') target = 0;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() duration = 1600; // ms

  private observer?: IntersectionObserver;
  private started = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.render(this.target);
      return;
    }

    this.render(0);
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.animate();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate() {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      this.render(Math.round(eased * this.target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  private render(value: number) {
    this.el.nativeElement.textContent = `${this.prefix}${value}${this.suffix}`;
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
