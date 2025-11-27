import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArtigoFormComponent } from './pages/artigos-form/artigos-form.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { TrabalhoEventoFormComponent } from './pages/trabalhos-eventos/trabalho-evento-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'artigos', component: ArtigoFormComponent },
  { path: 'trabalhos-eventos', component: TrabalhoEventoFormComponent },
  { path: '**', redirectTo: '/login' }
];