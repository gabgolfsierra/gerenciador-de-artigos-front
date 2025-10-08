import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtigosListComponent } from './pages/artigos-list/artigos-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },        
  { path: 'artigos', component: ArtigosListComponent }, 
 
];
