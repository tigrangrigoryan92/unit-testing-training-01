import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'expenses', pathMatch: 'full' },
    { path: 'expenses', loadComponent: () => import('./transactions.component')}
];
