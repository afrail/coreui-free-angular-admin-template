import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../service/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup | undefined;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  constructor(private _formBuilder: FormBuilder, private auth_service: AuthService) { }

  submit(): void {
    // @ts-ignore
    if (this.loginForm.valid) {
      // @ts-ignore
      const { username, password } = this.loginForm.value;
      console.log('Login Attempt:', { username, password });

      // Implement your login logic here, such as calling an API
      // Example:
      // this.authService.login(username, password).subscribe({
      //   next: (response) => {
      //     console.log('Login Successful:', response);
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error: (error) => {
      //     console.error('Login Failed:', error);
      //   }
      // });

      alert('Login successful!'); // Temporary action
    } else {
      console.log('Form is invalid');
    }
  }

}
