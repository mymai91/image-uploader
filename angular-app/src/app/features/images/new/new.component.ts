import { Component } from '@angular/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ImagesService } from '../service/images.service'
import { error } from 'console'

@Component({
  selector: 'app-image-new',
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class CreateNewImageComponent {
  accept = 'image/jpeg,image/jpg,image/png'
  files: File[] = []
  maxFileSize = 5 * 1024 * 1024 // max 5MB
  isUploading = false

  constructor(private imageService: ImagesService) {}

  onSelect(event: any): void {
    console.log('Files added:', event.addedFiles)

    const imageUploads = event.addedFiles

    if (imageUploads.length > 0) {
      const imageFile = imageUploads[0]
      const description = '#TODO will get file name'
      this.uploadImage(imageFile, description)
    }

    // this.files.push(...event.addedFiles)
  }

  onRemove(file: File): void {
    console.log('File removed:', file)
    // this.files = this.files.filter(f => f !== file)
  }

  uploadImage(file: File, description: string) {
    this.isUploading = true

    this.imageService.uploadImage(file, description).subscribe({
      next: response => {
        console.log('upload successful', response)
      },
      error: error => {
        console.error('upload error', error)
      },
      complete: () => {
        this.isUploading = false
      },
    })
  }
}
