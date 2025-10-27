import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./auth.shared.scss'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterComponent {
  email = '';
  senha = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.senha || this.loading) return;
    this.loading = true;
    this.auth.register(this.email, this.senha).subscribe({
      next: () => { this.loading = false; alert('Cadastro realizado'); this.router.navigateByUrl('/login'); },
      error: (e) => { this.loading = false; alert(typeof e?.error === 'string' ? e.error : 'Erro ao cadastrar'); }
    });
  }
}
