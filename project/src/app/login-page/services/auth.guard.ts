import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StorageService} from '@appRoot/login-page/services/storage.service';

export const authGuard: CanActivateFn = (
  route, state,
  storageService = inject(StorageService),
  router = inject(Router)
) => {

  if (storageService.getUser()?.id && storageService.getUser()?.id === +(route.paramMap.get('id') ?? 0)) {
    return true;
  }
  return router.navigate(['/login'])
};
