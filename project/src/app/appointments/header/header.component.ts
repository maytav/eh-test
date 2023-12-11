import {Component, Input, OnInit} from '@angular/core';
import {User} from '@appRoot/login-page/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  date: Date  = new Date();
  time: string  = this.date.toLocaleTimeString();
  @Input({required: true}) patient: User | undefined;
}
