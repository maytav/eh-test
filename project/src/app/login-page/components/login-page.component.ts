import {Component, EventEmitter, inject, Output} from '@angular/core';
import {UserService} from '@appRoot/login-page/services/user.service';
import {Router} from '@angular/router';
import {User} from '@appRoot/login-page/models/user';
import {AuthService} from '@appRoot/login-page/services/auth.service';
import {StorageService} from '@appRoot/login-page/services/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username = '';
  errorMessage = ''
  @Output() userChanged = new EventEmitter<string>();
  private readonly userService = inject(UserService)
  private readonly authService = inject(AuthService)
  private readonly storageService = inject(StorageService)
  private readonly router = inject(Router)

  searchAppointments() {
    this.authService.login(this.username)
      .subscribe({
          next: (user: User) => {
            if (user?.id) {
              this.storageService.setUser(user);
              this.router.navigate(['/appointments', user.id]).then();
            } else {
              this.errorMessage = 'שם משתמש לא קיים';
              console.log(this.errorMessage)
            }
          },
          error: (error: any) => {
            console.error(error);
            this.errorMessage = 'אירעה שגיאה בשרת';
          }
        }
      );
  }

}
