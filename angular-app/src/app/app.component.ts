import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { HeaderComponent } from './shared/components/header/header.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'image-uploader-angular-app'

  // showHeader(): boolean {
  //   return (
  //     this.router.url !== '/login' &&
  //     this.router.url !== '/register' &&
  //     this.router.url !== '/'
  //   )
  // }

  showHeader(): boolean {
    const urlWithoutQuery = this.router.url.split('?')[0]
    return (
      urlWithoutQuery !== '/login' &&
      this.router.url !== '/register' &&
      this.router.url !== '/'
    )
  }
}
