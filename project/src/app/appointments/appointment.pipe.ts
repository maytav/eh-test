import {Pipe, PipeTransform} from '@angular/core';
import {Appointment} from '@appRoot/appointments/models';

@Pipe({
  name: 'appointment',
  standalone: true,
})
export class AppointmentPipe implements PipeTransform {

  transform(value: Appointment[], name: string | undefined): any {
    if (name === undefined || name === null || name === '') {
      return value
    }
    return value.filter(({docName}) => docName === name);
  }

}
