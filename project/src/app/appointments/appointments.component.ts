import {Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {UserService} from '@appRoot/login-page/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '@appRoot/login-page/models/user';
import {Appointment} from '@appRoot/appointments/models';
import {SideMenuComponent} from '@appRoot/appointments/side-menu/side-menu.component';
import {StorageService} from '@appRoot/login-page/services/storage.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  @ViewChild(SideMenuComponent) sideMenu!: SideMenuComponent
  private readonly userService = inject(UserService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly storageService = inject(StorageService)

  private _user: WritableSignal<User | undefined> = signal(undefined);

  get user(): User | undefined {
    return this._user();
  }

  set user(value: User) {
    this._user?.set(value);
  }

  ngOnDestroy(): void {
    this.storageService.removeUser()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
        this.userService.getUserById(params['id']).subscribe(user => this.user = user)
    })
  }

  onEditAppointment(appointment: Appointment) {
    this.sideMenu.setAppointment(appointment)

  }
  clear() {
    this.sideMenu.clear()

  }
}
