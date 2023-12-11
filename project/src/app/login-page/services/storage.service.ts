import {Injectable, OnDestroy} from '@angular/core';
import {User} from '@appRoot/login-page/models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService{


  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  removeUser() {
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
