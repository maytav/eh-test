import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/components/login-page.component';
import {AppointmentsComponent} from './appointments/appointments.component';
import {HeaderComponent} from './appointments/header/header.component';
import {SideMenuComponent} from './appointments/side-menu/side-menu.component';
import {AppointmentsListComponent} from './appointments/appointments-list/appointments-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppointmentPipe } from './appointments/appointment.pipe';
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppointmentsComponent,
    HeaderComponent,
    SideMenuComponent,
    AppointmentsListComponent,

  ],
  imports: [
    AppointmentPipe,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
