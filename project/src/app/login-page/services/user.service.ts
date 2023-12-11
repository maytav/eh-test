import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '@appRoot/login-page/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/users'
  private readonly httpClient = inject(HttpClient)


  getUserByName(userName: string): Observable<User> {
    return this.httpClient.get<User[]>
    (this.baseUrl,
      {params: {userName}}).pipe(map(arr => arr[0]))
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User[]>
    (this.baseUrl,
      {params: {id}}).pipe(map(arr => arr[0]))
  }
}
