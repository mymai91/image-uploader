import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
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
  @Input() isActive: boolean = true

  @Output() onDelete = new EventEmitter<number>()
  @Output() onRestore = new EventEmitter<number>()

  constructor() {}

  handleDelete(id: number) {
    this.onDelete.emit(id)
  }

  handleRestore(id: number) {
    this.onRestore.emit(id)
  }
}
