import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '@app/features/auth/service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  menuOpen = false

  constructor(private router: Router, private authService: AuthService) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen
  }

  logout(): void {
    this.authService.signout()
    this.router.navigate(['/login'])
  }
}
