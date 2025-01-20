import { Component } from '@angular/core'
import { NgxDropzoneModule } from 'ngx-dropzone'

@Component({
  selector: 'app-image-new',
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class CreateNewImageComponent {
  files: File[] = []

  onSelect(event: File[]) {
    console.log('event', event)
    this.files = event
  }
}
