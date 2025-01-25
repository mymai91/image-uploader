import { Component } from '@angular/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ImagesService } from '../service/images.service'
import { Router } from '@angular/router'
import { ImageListComponent } from '../components/image-list/image-list.component'
import { ImageResponse } from '../images.type'
import { response } from 'express'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-image-new',
  standalone: true,
  imports: [NgxDropzoneModule, ImageListComponent, CommonModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class CreateNewImageComponent {
  accept = 'image/jpeg,image/jpg,image/png'
  files: File[] = []
  maxFileSize = 5 * 1024 * 1024 // max 5MB
  isUploading = false
  activeImages: ImageResponse[] = []
  inactiveImages: ImageResponse[] = []
  isLoading = false
  error = ''
  activeTab = 'active'

  constructor(private imagesService: ImagesService, private router: Router) {}

  ngOnInit() {
    // Subscribe to reactive streams

    this.imagesService.activeImages$.subscribe(response => {
      this.activeImages = response.items
    })

    this.imagesService.inactiveImages$.subscribe(response => {
      this.inactiveImages = response.items
    })

    // Load initial data
    this.loadImages(true)
    this.loadImages(false)
  }

  loadImages(isActive: boolean) {
    this.isLoading = true

    this.imagesService
      .getListImages({
        isActive,
      })
      .subscribe({
        next: () => {
          this.isLoading = false // Reactive streams handle data updates
        },
        error: err => {
          console.error('Failed to load images:', err)
          this.error = 'Failed to load images.'
          this.isLoading = false
        },
      })
  }

  deleteImage(id: number) {
    if (!confirm('Are you sure you want to delete this image?')) return

    this.imagesService.deleteImage(id).subscribe({
      next: () => console.log(`Image with ID ${id} deleted.`),
      error: err => {
        console.error('Failed to delete image:', err)
        this.error = 'Failed to delete image.'
      },
    })
  }

  switchTab(tab: 'active' | 'inactive') {
    this.activeTab = tab
  }

  restoreImage(id: number) {
    this.imagesService.restoreImage(id).subscribe({
      next: () => console.log(`Image ${id} restored`),
      error: err => {
        console.error('Failed to restore image:', err)
        this.error = 'Failed to restore image.'
      },
    })
  }

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

    this.imagesService.uploadImage(file, description).subscribe({
      next: response => {
        // console.log('upload successful', response)
        this.router.navigate(['/images'])
      },
      error: error => {},
      complete: () => {
        this.isUploading = false
      },
    })
  }
}
