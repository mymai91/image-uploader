import { Component, OnInit } from '@angular/core'
import { ImagesService } from '../service/images.service'
import { ImageResponse } from '../images.type'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ImageListComponent } from '../components/image-list/image-list.component'

@Component({
  selector: 'app-image-list',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  imports: [CommonModule, RouterModule, ImageListComponent],
})
export class ImagesComponent implements OnInit {
  activeImages: ImageResponse[] = []
  inactiveImages: ImageResponse[] = []
  activePagination = { page: 1, limit: 10, totalPages: 1 }
  inactivePagination = { page: 1, limit: 10, totalPages: 1 }
  isLoading = false
  error = ''
  activeTab = 'active'

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    // Subscribe to reactive streams
    this.imagesService.activeImages$.subscribe(response => {
      console.log('Active Images Response:', response)
      this.activeImages = response.items
      this.activePagination.totalPages = response.totalPages
    })

    this.imagesService.inactiveImages$.subscribe(response => {
      console.log('inactiveImages Images Response:', response)
      this.inactiveImages = response.items
      this.inactivePagination.totalPages = response.totalPages
    })

    // Load initial data
    this.loadImages(true)
    this.loadImages(false)
  }

  loadImages(isActive: boolean) {
    const pagination = isActive
      ? this.activePagination
      : this.inactivePagination
    this.isLoading = true

    this.imagesService
      .getListImages({
        isActive,
        page: pagination.page,
        limit: pagination.limit,
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
}
