import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  @Output() switchToRegister = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder, 
    private authService:AuthService,
    public Toast: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    })
  }

  formatFormControlName(formControlName: string): string {
    return formControlName
      .replace(/\b\w/g, char => char.toUpperCase()); 
  }

  getErrorMessages(formControlName: string) {
    const control = this.loginForm.get(formControlName);
    if(control?.touched && control?.invalid){
      if(control?.hasError('required')){
        return `${this.formatFormControlName(formControlName)} is required`
      }
      if(control?.hasError('email')){
        return `Enter a valid email address`
      }
      if (control?.hasError('minlength')) {
        return `${this.formatFormControlName(formControlName)}  Password cannot be lesser than 6 characters.`;
      }
      if (control?.hasError('maxlength')) {
        return `${this.formatFormControlName(formControlName)}  cannot be greater than 12 characters.`;
      }
    }
    return '';
  }

  goToRegister() {
    console.log('iran')
    this.switchToRegister.emit();
  }

  submitForm(){
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      this.authService.login(formData).subscribe({
        next: (response) => {
          if (response.status) {
            this.Toast.success('login succesfully');
          } else {
            this.Toast.error('user registerd not succesfully');
            console.log('response :>> ', response);
          }
        },
        error: (err) => {
          console.error('err :>> ', err);
          this.Toast.error(err.error.message);
        },
      });

    }
  }

}
