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
        // Páginas de servicio (SEO): carga diferida
        path: 'servicios/perforacion-de-pozos',
        loadComponent: () => import('./services/perforacion-pozos.component').then(m => m.PerforacionPozosComponent)
    },
    {
        path: 'servicios/estudios-hidrogeologicos',
        loadComponent: () => import('./services/estudios-hidrogeologicos.component').then(m => m.EstudiosHidrogeologicosComponent)
    },
    {
        path: 'servicios/mantenimiento-de-pozos',
        loadComponent: () => import('./services/mantenimiento-de-pozos.component').then(m => m.MantenimientoDePozosComponent)
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
