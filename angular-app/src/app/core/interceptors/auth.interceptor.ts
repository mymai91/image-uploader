import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { StorageService } from '../storage/storage.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)
  const token = storageService.getItem('accessToken')

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return next(req)
}
