import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./auth.shared.scss'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {
  email = '';
  senha = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
  if (!this.email || !this.senha || this.loading) return;
  this.loading = true;

  this.auth.login(this.email, this.senha).subscribe({
    next: (res) => {
      this.loading = false;
 
      this.router.navigate(['/']); 
    },
    error: (e) => {
      this.loading = false;
      console.error('Login error:', e);
      alert(typeof e?.error === 'string' ? e.error : 'Credenciais inválidas');
    }
  });
}

}
