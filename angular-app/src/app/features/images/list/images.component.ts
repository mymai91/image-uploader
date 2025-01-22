import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ImageResponse } from '../images.type'
import { ImagesService } from '../service/images.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
})
export class ImagesComponent implements OnInit {
  images: ImageResponse[] = []
  isLoading = false
  error = ''
  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    this.loadImages()
  }

  loadImages() {
    this.isLoading = true
    this.imagesService.getListImages().subscribe({
      next: images => {
        // console.log('images', images)
        this.images = images
      },
      error: error => {
        console.error('error', error)
        this.error = 'Failed to load images'
      },
      complete: () => {
        this.isLoading = false
      },
    })
  }

  deleteImage(id: number) {
    if (!confirm('Are you sure you want to delete this image?')) {
      return // Exit if the user cancels
    }

    this.isLoading = true
    this.imagesService.deleteImage(id).subscribe({
      next: () => {
        console.log(`Image with ID ${id} deleted successfully.`)
        this.images = this.images.filter(image => image.id !== id) // Remove the image from the list
      },
      error: error => {
        console.error('Failed to delete image', error)
        this.error = 'Failed to delete image'
      },
      complete: () => {
        this.isLoading = false
      },
    })
  }
}
