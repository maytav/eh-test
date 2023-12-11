import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '@appRoot/login-page/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/users'
  private readonly http = inject(HttpClient)

  login(userName: string): Observable<User> {
    return this.http.get<User[]>
    (this.baseUrl,
      {params: {userName}}).pipe(map(arr => arr[0]))
  }
}
