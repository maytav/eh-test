import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '@appRoot/appointments/models';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly baseUrl = 'http://localhost:3000/appointments'
  private readonly httpClient = inject(HttpClient)

  private _appointments: WritableSignal<Appointment[]> = signal([])

  get appointments(): Appointment[] {
    return this._appointments().sort((a: Appointment, b: Appointment) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  set appointments(appointments: Appointment[]) {
    this._appointments.set(appointments);
  }


  updateAppointments(appointment: Appointment) {
    const currentAppointments = this.appointments
    const index = currentAppointments.findIndex(a => a.id === appointment.id)

    if (index > -1) {
      currentAppointments[index] = appointment;
    } else {
      currentAppointments.push(appointment);
    }
    this._appointments.set(currentAppointments);
  }


  addAppointment(appointment: Appointment) {
    return this.httpClient.post<Appointment>(this.baseUrl, appointment).pipe(
      tap(appointment => this.updateAppointments(appointment))
    )
  }

  editAppointment(id: number, appointment: Appointment) {
    return this.httpClient.put<Appointment>(`${this.baseUrl}/${id}`, appointment).pipe(
      tap(appointment => this.updateAppointments(appointment))
    )
  }

  getAppointmentsByUser(userName: string | undefined) {
    if (userName === undefined) return
    return this.httpClient.get<Appointment[]>(this.baseUrl, {params: {userName}}).pipe(
      tap(appointments => this.appointments = appointments))
  }

  deleteAppointment(id: number) {
    return this.httpClient.delete<Appointment>(`${this.baseUrl}/${id}`).pipe(
      tap(appointment => this.appointments = this.appointments.filter(a => a.id !== id))
    )
  }
}
