import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Doctor} from '@appRoot/appointments/models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private readonly baseUrl = 'http://localhost:3000/doctors'
  private readonly httpClient = inject(HttpClient)

  getDoctors() {
    return this.httpClient.get<Doctor[]>(this.baseUrl)
  }
}
