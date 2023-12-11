import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {User} from '@appRoot/login-page/models/user';
import {AppointmentsService} from '@appRoot/appointments/services/appointments.service';
import {Appointment} from '@appRoot/appointments/models';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {
  patient$: Subject<User | undefined> = new Subject();
  doctors: string[] = [];
  filter: string = '';
  username: string = '';

  @Output() setAppointment = new EventEmitter<Appointment>()
  @Output() onDeleteAppointment = new EventEmitter<void>()
  private readonly appointmentService: AppointmentsService = inject(AppointmentsService)

  private _patient: User | undefined;
  get patient(): User | undefined {
    return this._patient;
  }

  @Input({required: true}) set patient(value: User | undefined) {
    this._patient = value;
    this.patient$.next(value);
  }

  get appointments() {
    return this.appointmentService.appointments as Appointment[]
  }

  ngOnInit(): void {
    this.patient$.subscribe((user) => {
      this.appointmentService.getAppointmentsByUser(user?.userName)?.subscribe(data =>
        this.doctors = [...new Set(data.map(a => a.docName))]
      );
    })
  }

  sortAppointments(): void {
    this.appointments.sort((a: Appointment, b: Appointment) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id)
      .subscribe(() => {
        this.onDeleteAppointment.emit()
      });
  }

  editAppointment(id: number): void {
    const appointment = this.appointments.find(a => a.id === id);
    if (appointment) {
      this.setAppointment.emit(appointment)
    }
  }
}



