import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        // Página de servicio (SEO): carga diferida
        path: 'servicios/perforacion-de-pozos',
        loadComponent: () => import('./services/perforacion-pozos.component').then(m => m.PerforacionPozosComponent)
    },
    {
        // Páginas legales: carga diferida para no engordar el bundle inicial
        path: 'terminos',
        loadComponent: () => import('./legal/terminos.component').then(m => m.TerminosComponent)
    },
    {
        path: 'privacidad',
        loadComponent: () => import('./legal/privacidad.component').then(m => m.PrivacidadComponent)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
