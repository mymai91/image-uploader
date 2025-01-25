import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { ImageResponse } from '../../images.type'

@Component({
  selector: 'global-image-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss',
})
export class ImageListComponent {
  @Input() title: string = ''
  @Input() images: ImageResponse[] = []
  @Input() noImagesMessage: string = 'No images found'

  constructor() {}
}
