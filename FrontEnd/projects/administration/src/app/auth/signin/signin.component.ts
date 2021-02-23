import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalService } from 'projects/shared/src/lib/services/global/global.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { AuthService } from 'projects/shared/src/lib/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private baseApp:AppComponent
    // private toast: ToastService
  ) { }


  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
      this.router.navigate([redirect]);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required, ],
      password: ['', Validators.required]
    });

    this.loginForm.setValue({
      username:'varun@webkodz.com',
      password:"varunsingh"
    })
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.submitted = true;
    console.log("Submitting form")
    console.log(this.username.value)
    console.log(this.password.value)

    this.authService.login("user/signin", this.username.value, this.password.value).subscribe(
      (response) => {
        console.log(response)
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
          this.router.navigate([redirect]);
          this.baseApp.showSuccess("Logged In Successfully!!", "Welcome Back")
      },
      (error) => {
        this.baseApp.showError(error.errorTitle, error.errorDesc)
      }
    );
  }
  generateErrorNotification(heading, message){
    const options = {opacity: 0.8, progressBar: true,  timeOut: 3000,  positionClass: 'md-toast-bottom-right' };
  }
}
 
