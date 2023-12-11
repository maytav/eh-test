import {ChangeDetectorRef, Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DoctorsService} from '@appRoot/appointments/services/doctors.service';
import {Doctor} from '@appRoot/appointments/models/doctor';
import {AppointmentsService} from '@appRoot/appointments/services/appointments.service';
import {User} from '@appRoot/login-page/models/user';
import {Appointment} from '@appRoot/appointments/models';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input({required: true}) patient!: User | undefined;
  form!: FormGroup;
  @Input() editMode: boolean | undefined;
  editId: number  = 0;
  @Input() appointment$: Subject<Appointment> = new Subject<Appointment>()
  private readonly fb = inject(FormBuilder);
  private readonly doctorsService = inject(DoctorsService)
  private readonly appointmentsService = inject(AppointmentsService)

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.doctorsService.getDoctors().subscribe((doctors) => this.doctors = doctors)
    this.form = this.fb.group({
      userName: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      info: [''],
      docName: ['', Validators.required],
    });
  }

  _doctors: WritableSignal<Doctor[]> = signal([]);

  get doctors() {
    return this._doctors()
  }

  set doctors(doctors: Doctor[]) {
    this._doctors.set(doctors)
  }

  ngOnInit(): void {
    this.appointment$.subscribe(console.log)
  }

  setAppointment(appointment: Appointment): void {
    console.log(appointment)
    this.form.setValue({
      docName: appointment.docName,
      date: appointment.date,
      time: appointment.time,
      userName: appointment.userName,
      info: appointment.info
    });
    this.form.updateValueAndValidity()
    this.editMode = true;
    this.editId = appointment.id;
    this.changeDetectorRef.detectChanges();
  }

  submit() {
    if (this.form.valid) {
      if (this.editMode) {
        this.appointmentsService.editAppointment(this.editId,this.form.value).subscribe(console.log)
      } else {
        this.form.patchValue({userName: this.patient?.userName})
        this.appointmentsService.addAppointment(this.form.value)
          .subscribe({
            next: (result: any) => {
              console.log(result);
              alert('התור נקבע בהצלחה!');
              this.form.reset();
            },
            error: (error: any) => {
              console.error(error);
              alert('אירעה שגיאה בקביעת התור, אנא נסה שוב מאוחר יותר');
            }
          });
      }
    } else {
      alert('אנא מלא את כל השדות החובה');
    }
  }

  clear() {
    this.form.reset();
    this.editId = 0;
    this.editMode = false;
  }
}
