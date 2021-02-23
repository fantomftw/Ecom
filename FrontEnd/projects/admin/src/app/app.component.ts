import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  constructor(private toastr: ToastrService) {}

  showSuccess(heading, message) {
    console.log(heading +', '+message)
    this.toastr.success(message, heading);
  }
  showError(heading, message) {
    console.log(heading +', '+message)
    this.toastr.error(message, heading);
  }
  showInfo(heading, message) {
    console.log(heading +', '+message)
    this.toastr.info(message, heading);
  }
  showWarning(heading, message) {
    console.log(heading +', '+message)
    this.toastr.warning(message, heading);
  }
}
