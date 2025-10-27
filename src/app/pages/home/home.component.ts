import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('advancedDialog') advancedDialog!: ElementRef<HTMLDialogElement>;

  constructor(private router: Router) {}

  openAdvanced() {
    const dlg = this.advancedDialog?.nativeElement;
    if (dlg && !dlg.open) dlg.showModal();
  }
  closeAdvanced() {
    const dlg = this.advancedDialog?.nativeElement;
    if (dlg?.open) dlg.close();
  }

  goToList(filters: Record<string, string>) {
    this.closeAdvanced();
    this.router.navigate(['/artigos'], { queryParams: filters });
    this.router.navigate(['/trabalhos-eventos'], { queryParams: filters });
  }
}
