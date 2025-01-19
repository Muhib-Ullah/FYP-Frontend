import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if(authService.isloggedIn()){
    return true;
  }
  else{
    router.navigate(['/'])
    toastr.error('Please login first to use our services.')
    return false;
  }
};
