import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  countryArray: any[] = [];
  @Output() switchToLogin = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    public authService: AuthService,
    public Toast: ToastrService
    ) {
    
      this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      contact: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^\+?[0-9]\d{1,14}$/)]],
      country: [null , [Validators.required]],
      institute: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.fetchCountries()
  }

  fetchCountries() : any {
    this.http.get<any[]>('assets/countries.json').subscribe(
      {
        next: (data) => {
          this.countryArray = data;
          console.log(this.countryArray)
        },
        error: (err) => {
          console.error('Error fetching countries data', err)
        }
      }
    );
  }



  formatFormControlName(formControlName: string): string {
    return formControlName
      .replace(/_/g, ' ') 
      .replace(/\b\w/g, char => char.toUpperCase()); 
  }

  getErrorMessages(formControlName: string) {
    const control = this.registerForm.get(formControlName);
    if(control?.touched && control?.invalid){
      if(control?.hasError('required')){
        return `${this.formatFormControlName(formControlName)} is required`;
      }
      if(control?.hasError('email')){
        return `Enter a valid email address`
      }
      if (control?.hasError('minlength')) {
        const minLength = control.getError('minlength')?.requiredLength;
        return `${this.formatFormControlName(formControlName)} cannot be lesser than ${minLength} characters`;
      }
      if (control?.hasError('maxlength')) {
        const maxLength = control.getError('maxlength')?.requiredLength; 
        return `${this.formatFormControlName(formControlName)} cannot be greater than ${maxLength} characters.`;
      }
      if (control?.hasError('pattern')) {
        return `Invalid ${this.formatFormControlName(formControlName)} format`
      }
    }
    return '';
  }

  goToLogin() {
    this.switchToLogin.emit();
  }


  submitForm(){
    if (this.registerForm.valid) {
      const formData = this.registerForm.value
      console.log(' formData :>> ', formData);

      this.authService.register(formData).subscribe({
        next: (response) => {
          if (response.status) {
            this.Toast.success('user registerd succesfully');
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
