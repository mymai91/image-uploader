import { Injectable, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser: boolean

  constructor() {
    this.isBrowser = typeof window !== 'undefined'
  }

  getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value)
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key)
    }
  }
}
